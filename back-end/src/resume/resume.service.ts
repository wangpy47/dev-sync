import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { UserService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ResumeModel } from './entities/resume.entity';
import { ILike, In, Repository } from 'typeorm';
import { IntroductionModel } from './entities/introduction.entity';
import { CreateIntroductionDto } from './dto/create-introduction.dto';
import { SkillModel } from './entities/skill.entity';
import { ProfileModel } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProjectModel } from './entities/project.entity';
import { ProjectOutcomeModel } from './entities/project-outcome.entity';
import { CreateOutcomeDto } from './dto/create-project-outcome.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateProjects } from './dto/create-projects-width-outcomes.dto';
import { CreateSkillsDto } from './dto/create-skills.dto';

@Injectable()
export class ResumeService {
  // GitHub API를 통해 레포지토리 리스트 가져오기

  constructor(
    private readonly userService: UserService,
    @InjectRepository(ResumeModel)
    private readonly resumeRepository: Repository<ResumeModel>,
    @InjectRepository(IntroductionModel)
    private readonly introductionRepository: Repository<IntroductionModel>,
    @InjectRepository(SkillModel)
    private readonly skillRepository: Repository<SkillModel>,
    @InjectRepository(ProjectModel)
    private readonly projectRepository: Repository<ProjectModel>,
    @InjectRepository(ProjectOutcomeModel)
    private readonly projectOutcomeRepository: Repository<ProjectOutcomeModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
  ) {}

  // GITHUB 인증 헤더 생성 함수
  private getAuthHeaders() {
    return {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    };
  }

  async getGitHubData(name: string, email: string) {
    const userinfo = [];

    const user = await this.userService.getUser(email);

    const username = user.githubUrl.split('/').pop();

    // 모든 레포지토리 가져오기
    const repositories = await this.getUserRepositories(username);

    // 레포지토리를 크기순으로 내림차순 정렬 후 최대 7개 선택
    const topRepositories = repositories
      .sort((a, b) => b.size - a.size)
      .slice(0, 7);

    // 상위 7개의 레포지토리에 대해 정보 수집
    for (const repository of topRepositories) {
      const repoInfo = {
        name: repository.name,
        description: repository.description,
        language: repository.language,
        size: repository.size,
        stargazers_count: repository.stargazers_count,
        forks_count: repository.forks_count,
        html_url: repository.html_url,
        readme_content:
          !repository.description &&
          (await this.getReadmeContent(username, repository.name)),
      };

      const additionalData = await this.getAdditionalRepositoryData(
        username,
        repository.name,
      );
      userinfo.push({ ...repoInfo, ...additionalData });
    }

    if (userinfo.length === 0) {
      throw new Error('No repositories found for the user');
    }

    return userinfo;
  }

  async getUserRepositories(username: string) {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
          },
        },
      );
      return response.data; // 레포지토리 리스트 반환
    } catch (error) {
      console.error(
        'Error fetching GitHub repositories:',
        error.response?.data || error.message,
      );
      throw new Error('Failed to fetch GitHub repositories');
    }
  }

  // README 파일을 가져오는 함수
  async getReadmeContent(username: string, repoName: string) {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${username}/${repoName}/contents/README.md`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
          },
        },
      );

      const content = Buffer.from(response.data.content, 'base64').toString(
        'utf-8',
      );

      let cleanedText = content.replace(/<\/?[^>]+(>|$)/g, '\n');

      cleanedText = cleanedText.replace(/!\[.*?\]\(.*?\)/g, '');

      cleanedText = cleanedText.replace(/\\n\s*\+/g, '');

      cleanedText = cleanedText.replace(/\s+/g, ' ');

      cleanedText = cleanedText.replace(/\n+/g, '\n');

      return cleanedText.trim();
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return 'README not available';
      } else {
        console.error(
          `Error fetching README for ${repoName}:`,
          error.response?.data || error.message,
        );
        return 'Error fetching README';
      }
    }
  }

  async getAdditionalRepositoryData(username: string, repositoryName: string) {
    const pp: any = {};

    try {
      const commitMessages = await axios.get(
        `https://api.github.com/repos/${username}/${repositoryName}/commits`,
        {
          headers: this.getAuthHeaders(),
        },
      );

      // username에 해당하는 사용자의 커밋만 필터링
      pp.recent_commit_messages = commitMessages.data
        .filter((commit) => commit.author && commit.author.login === username) // username 필터링
        .map((commit) => {
          let message = commit.commit.message;
          message = message.replace(/\n\s*\+/g, '');
          message = message.replace(/\s+/g, ' ');
          message = message.replace(/\n+/g, '\n');
          return message.trim();
        })
        .filter((message, index, self) => {
          // 불필요한 메시지를 제거
          const ignorePattern =
            /^(merge( branch)?|update|initial commit|release|resolve|bump|create readme|fix conflicts)/i;
          if (ignorePattern.test(message)) return false;

          // 중복 메시지 제거
          return self.indexOf(message) === index;
        })
        .filter((message) => {
          // 의미 없는 커밋 메시지 제거 (너무 짧은 메시지)
          return message.length > 10;
        });

      // 기여자 정보
      const contributorsData = await axios.get(
        `https://api.github.com/repos/${username}/${repositoryName}/contributors`,
        {
          headers: this.getAuthHeaders(),
        },
      );
      const userContributions = contributorsData.data.find(
        (contributor) => contributor.login === username,
      );
      pp.contributions = userContributions
        ? userContributions.contributions
        : 0;

      // 풀 리퀘스트
      const pullRequests = await axios.get(
        `https://api.github.com/repos/${username}/${repositoryName}/pulls`,
        {
          headers: this.getAuthHeaders(),
        },
      );
      pp.recent_pull_requests = pullRequests.data.slice(0, 3).map((pr) => ({
        title: pr.title,
        created_at: pr.created_at,
        status: pr.state,
      }));

      // 릴리즈 정보
      const releasesData = await axios.get(
        `https://api.github.com/repos/${username}/${repositoryName}/releases`,
        {
          headers: this.getAuthHeaders(),
        },
      );
      pp.latest_release =
        releasesData.data.length > 0 ? releasesData.data[0].name : 'No release';
    } catch (error) {
      console.error(
        'Error fetching repository data:',
        error.response?.data || error.message,
      );
      throw new Error('Failed to fetch repository data');
    }

    return pp;
  }

  //resume CRUD

  getResumes(id: number): Promise<ResumeModel[]> {
    return this.resumeRepository.find({
      where: { author: { user_id: id } },
      relations: ['profile', 'str_skills', 'fam_skills'],
    });
  }

  private async getResume(id: string): Promise<ResumeModel> {
    const resume = await this.resumeRepository.findOne({
      where: { id },
    });
    if (!resume) {
      throw new NotFoundException(`Resume with ID ${id} not found.`);
    }
    return resume;
  }

  async getResumeDetails(id: string) {
    const resume = await this.resumeRepository.findOne({ where: { id } });
    if (!resume) throw new NotFoundException();

    const [profile, introduction, skills, projects] = await Promise.all([
      this.getProfile(resume.id),
      this.getIntroduction(resume.id),
      this.getSkillsByResumeId(id),
      this.getProjectsByResumeId(id),
    ]);

    const entities = [];

    if (profile) {
      entities.push(profile);
    }

    if (introduction) {
      entities.push(introduction);
    }

    if (skills) {
      entities.push(skills);
    }
    if (projects) {
      entities.push(...projects);
    }

    return {
      id: resume.id,
      title: resume.title,
      order: entities.map((e) => e.id),
      entities,
    };
  }

  async createResume(userId: number, title: string): Promise<ResumeModel> {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    const resume = this.resumeRepository.create({
      title,
      author: user,
    });

    return this.resumeRepository.save(resume);
  }

  async getIntroduction(resumeId: string) {
    const introduction = await this.introductionRepository.findOne({
      where: { resume: { id: resumeId } },
    });

    if (!introduction) {
      throw new NotFoundException(
        `Introduction for resume ${resumeId} not found`,
      );
    }

    return { id: introduction.id, type: 'introduction', ...introduction };
  }
  async removeResume(userId: number, resumeId: string): Promise<ResumeModel> {
    const resume = await this.getResume(resumeId);

    if (resume.author.user_id !== userId) {
      throw new NotFoundException(
        `Resume with ID ${resumeId} does not belong to user with ID ${userId}.`,
      );
    }

    return this.resumeRepository.remove(resume);
  }

  async upsertIntroduction(resumeId: string, dto: CreateIntroductionDto) {
    const resume = await this.getResume(resumeId);

    let introduction = await this.introductionRepository.findOne({
      where: { resume: { id: resume.id } },
    });

    if (!introduction) {
      introduction = this.introductionRepository.create({
        resume,
      });
    }

    introduction.headline = dto.headline;
    introduction.description = dto.description;

    return this.introductionRepository.save(introduction);
  }

  async removeIntroduction(resumeId: string) {
    const resume = await this.getResume(resumeId);

    const introduction = await this.introductionRepository.findOne({
      where: { resume: { id: resume.id } },
    });

    if (!introduction) {
      throw new NotFoundException(
        `Introduction for resume ID ${resumeId} not found.`,
      );
    }

    return this.introductionRepository.remove(introduction);
  }

  async getProfile(resumeId: string) {
    const profile = await this.profileRepository.findOne({
      where: { resume: { id: resumeId } },
    });

    if (!profile) {
      throw new NotFoundException(
        `Profile for resume ID ${resumeId} not found.`,
      );
    }

    return { id: profile.id, type: 'profile', ...profile };
  }

  async upsertProfile(resumeId: string, profileDto: CreateProfileDto) {
    const resume = await this.getResume(resumeId);

    let profile = await this.profileRepository.findOne({
      where: { resume: { id: resume.id } },
    });

    if (!profile) {
      profile = this.profileRepository.create({
        resume,
      });
    }

    profile.name = profileDto.name;
    profile.email = profileDto.email;
    profile.phoneNumber = profileDto.phoneNumber;
    profile.githubUrl = profileDto.githubUrl;
    profile.blogUrl = profileDto.blogUrl;

    return this.profileRepository.save(profile);
  }

  async removeProfile(resumeId: string) {
    const resume = await this.getResume(resumeId);

    const profile = await this.profileRepository.findOne({
      where: { resume: { id: resume.id } },
    });

    if (!profile) {
      throw new NotFoundException(
        `Profile for resume ID ${resumeId} not found.`,
      );
    }

    return this.profileRepository.remove(profile);
  }

  async getProjectsByResumeId(resumeId: string) {
    const projects = await this.projectRepository.find({
      where: { resume: { id: resumeId } },
      relations: ['skills', 'outcomes'],
    });

    if (!projects || projects.length === 0) {
      throw new NotFoundException(
        `Projects for resume ID ${resumeId} not found.`,
      );
    }

    return projects.map((project) => ({
      id: project.id,
      type: 'project',
      ...project,
    }));
  }

  async syncProjectsForResume(
    resumeId: string,
    createProjectsDto: CreateProjects,
  ): Promise<ProjectModel[]> {
    await this.getResume(resumeId);

    const incomingProjects = createProjectsDto.projects;
    const incomingIds = incomingProjects.map((p) => p.id);

    const existingProjects = await this.projectRepository.find({
      where: { resume: { id: resumeId } },
    });

    const toDelete = existingProjects.filter(
      (project) => !incomingIds.includes(project.id),
    );
    if (toDelete.length > 0) {
      await this.projectRepository.remove(toDelete);
    }

    const result: ProjectModel[] = [];

    for (const dto of incomingProjects) {
      const project = await this.upsertProject(resumeId, dto);
      result.push(project);
    }

    return result;
  }

  async upsertProject(
    resumeId: string,
    projectData: CreateProjectDto,
  ): Promise<ProjectModel> {
    const resume = await this.getResume(resumeId);

    const skillEntities = await this.skillRepository.find({
      where: { id: In(projectData.skills) },
    });

    let project = await this.projectRepository.findOne({
      where: { id: projectData.id, resume: { id: resume.id } },
      relations: ['skills', 'outcomes'],
    });

    if (!project) {
      project = this.projectRepository.create({
        ...projectData,
        resume,
        skills: skillEntities,
      });
    } else {
      Object.assign(project, {
        ...projectData,
        skills: skillEntities,
      });
    }

    project = await this.projectRepository.save(project);

    await this.syncProjectSkills(project.id, projectData.skills);
    await this.syncProjectOutcomes(project.id, projectData.outcomes);

    return this.projectRepository.findOne({
      where: { id: project.id },
      relations: ['skills', 'outcomes'],
    });
  }

  async removeProject(resumeId: string, projectId: string) {
    const resume = await this.getResume(resumeId);

    const project = await this.projectRepository.findOne({
      where: { id: projectId, resume: { id: resume.id } },
    });

    if (!project) {
      throw new NotFoundException(
        `Project with ID ${projectId} for resume ID ${resumeId} not found.`,
      );
    }

    return this.projectRepository.remove(project);
  }

  async getProjectOutcomesByProjectId(
    projectId: string,
  ): Promise<ProjectOutcomeModel[]> {
    return this.projectOutcomeRepository.find({
      where: { project: { id: projectId } },
      relations: ['project'],
    });
  }

  async syncProjectOutcomes(
    projectId: string,
    outcomeDtos: CreateOutcomeDto[],
  ): Promise<ProjectOutcomeModel[]> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['outcomes'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found.`);
    }

    const existingOutcomes = project.outcomes || [];

    const incomingIds = outcomeDtos.map((dto) => dto.id);
    const toDelete = existingOutcomes.filter(
      (existing) => !incomingIds.includes(existing.id),
    );
    if (toDelete.length > 0) {
      await this.projectOutcomeRepository.remove(toDelete);
    }

    const result: ProjectOutcomeModel[] = [];

    for (const dto of outcomeDtos) {
      let outcome: ProjectOutcomeModel;

      if (dto.id) {
        outcome = await this.projectOutcomeRepository.findOne({
          where: { id: dto.id, project: { id: projectId } },
        });
      }

      if (!outcome) {
        outcome = this.projectOutcomeRepository.create({
          ...dto,
          project,
        });
      } else {
        Object.assign(outcome, dto);
      }

      const saved = await this.projectOutcomeRepository.save(outcome);
      result.push(saved);
    }

    return result;
  }

  async removeProjectOutcome(projectId: string, outcomeId: string) {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found.`);
    }

    const outcome = await this.projectOutcomeRepository.findOne({
      where: { id: outcomeId, project: { id: project.id } },
    });

    if (!outcome) {
      throw new NotFoundException(
        `Outcome with ID ${outcomeId} for project ID ${projectId} not found.`,
      );
    }

    return this.projectOutcomeRepository.remove(outcome);
  }

  async getSkillsByResumeId(resumeId: string) {
    const resume = await this.getResume(resumeId);

    const strengths = await this.skillRepository.find({
      where: [{ strongResumes: { id: resume.id } }],
    });

    const familiars = await this.skillRepository.find({
      where: [{ familiarResumes: { id: resume.id } }],
    });

    return { id: 'skills', type: 'skills', strengths, familiars };
  }

  async syncProjectSkills(
    projectId: string,
    skillIds: number[],
  ): Promise<void> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['skills'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found.`);
    }

    const currentSkills = project.skills ?? [];
    const currentSkillIds = currentSkills.map((skill) => skill.id);

    const toRemove = currentSkills.filter(
      (skill) => !skillIds.includes(skill.id),
    );

    if (toRemove.length > 0) {
      project.skills = currentSkills.filter((skill) =>
        skillIds.includes(skill.id),
      );
    }

    const newSkillIds = skillIds.filter((id) => !currentSkillIds.includes(id));

    if (newSkillIds.length > 0) {
      const newSkills = await this.skillRepository.findBy({
        id: In(newSkillIds),
      });

      project.skills = [...(project.skills || []), ...newSkills];
    }

    await this.projectRepository.save(project);
  }

  async setSkillsForResume(
    resumeId: string,
    { strongSkillIds, familiarSkillIds }: CreateSkillsDto,
  ) {
    const resume = await this.resumeRepository.findOne({
      where: { id: resumeId },
      relations: ['str_skills', 'fam_skills'],
    });

    if (!resume) throw new NotFoundException('이력서를 찾을 수 없습니다.');

    const strongSkills =
      strongSkillIds.length > 0
        ? await this.skillRepository.findBy({ id: In(strongSkillIds) })
        : [];

    const familiarSkills =
      familiarSkillIds.length > 0
        ? await this.skillRepository.findBy({ id: In(familiarSkillIds) })
        : [];

    resume.str_skills = strongSkills;
    resume.fam_skills = familiarSkills;

    return await this.resumeRepository.save(resume);
  }

  async searchSkills(query: string): Promise<SkillModel[]> {
    if (!query) return [];

    return this.skillRepository.find({
      where: {
        name: ILike(`${query}%`),
      },
      order: { name: 'ASC' },
      take: 10,
    });
  }
}
