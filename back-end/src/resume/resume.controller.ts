import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { UserService } from 'src/user/user.service';
import { ResumeGenerationService } from './resumeGeneration.Service';
import { SkillSeederService } from './skill_seeder.service';
import { AuthenticatedGuard } from 'src/auth/auth.guard';
import { CreateIntroductionDto } from './dto/create-introduction.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CreateProjectsWidthOutcomesDto } from './dto/create-projects-width-outcomes.dto';
import { CreateSkillsDto } from './dto/create-skills.dto';
import { CreateAchievementsDto } from './dto/create-achievements.dto';
import { CreateCustomDto } from './dto/create-custom.dto';
import { CreateCareersDto } from './dto/create-careers.dto';

@Controller('resumes')
export class ResumeController {
  constructor(
    private readonly userService: UserService,
    private readonly resumeService: ResumeService,
    private readonly resumeGenerationService: ResumeGenerationService,
    private readonly skillSeederService: SkillSeederService,
  ) {}

  // 자소서 생성 엔드포인트
  @Post('generate')
  @UseGuards(AuthenticatedGuard)
  async generateResume(
    @Request() req,
    @Body('profileData') profileData: string
  ) {
    try {
      // 입력 데이터 길이를 최대 4000자로 제한
      const limitedProfileData = profileData.slice(0, 4000);

      const user = req.user;

      const resume = await this.resumeGenerationService.generateResume(
        limitedProfileData,
        user.id,
      );
      return resume;

    } catch(err) {
      console.error('Error generating resume:', err);
      throw new HttpException(
        'Failed to generate resume',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 사용자 레포지토리 정보 가져오기 엔드포인트
  @Get('github/repos')
  @UseGuards(AuthenticatedGuard)
  async getAuthStatus(@Request() req) {
    if (req.isAuthenticated()) {
      return await this.resumeService.getGitHubData(
        req.user.name,
        req.user.email,
      );
    } else {
      return 'Not authenticated';
    }
  }

  @Get()
  @UseGuards(AuthenticatedGuard)
  async getAllResumes(@Request() req) {
    return this.resumeService.getResumes(req.user.id); // 전체 조회
  }

  @Get(':id')
  @UseGuards(AuthenticatedGuard)
  async getResume(@Param('id') id: string) {
    const resume = await this.resumeService.getResumeDetails(id);
    if (!resume) {
      throw new HttpException('Resume not found', HttpStatus.NOT_FOUND);
    }

    return resume;
  }
  
  @Delete(':id')
  @UseGuards(AuthenticatedGuard)
  async deleteResume(@Param('id') id: string, @Request() req) {
    const user = req.user;
    const resume = await this.resumeService.removeResume(user.id, id);
    if (!resume) {
      throw new HttpException('Resume not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Resume deleted successfully' };
  }

  @Post(':id/introduction')
  @UseGuards(AuthenticatedGuard)
  async createIntroduction(
    @Param('id') id: string,
    @Body() createIntroductionDto: CreateIntroductionDto,
  ) {
    return await this.resumeService.saveBlock(
      id,
      createIntroductionDto,
    );
  }

  @Post(':id/profile')
  @UseGuards(AuthenticatedGuard)
  async createProfile(
    @Param('id') id: string,
    @Body() profileDto: CreateProfileDto,
  ) {
    return await this.resumeService.saveBlock(id, profileDto);
  }

  @Post(':id/projects')
  @UseGuards(AuthenticatedGuard)
  async createProject(
    @Param('id') id: string,
    @Body() createProjectsDto: CreateProjectsWidthOutcomesDto,
  ) {
    return await this.resumeService.saveBlock(
      id,
      createProjectsDto,
    );
  }

  @Post(':id/skills')
  @UseGuards(AuthenticatedGuard)
  async createSkills(
    @Param('id') id: string,
    @Body() createSkillsDto: CreateSkillsDto,
  ) {
    return await this.resumeService.saveBlock(id, createSkillsDto);
  }

  @Get('skills/search')
  @UseGuards(AuthenticatedGuard)
  async searchSkills(@Query('query') query: string) {
    return this.resumeService.searchSkills(query);
  }

  @Post(':id/achievements')
  @UseGuards(AuthenticatedGuard)
  async createAchievements(
    @Param('id') id: string,
    @Body() createAchievementsDto: CreateAchievementsDto,
  ) {
    return await this.resumeService.saveBlock(id, createAchievementsDto);
  }

  @Post(':id/custom')
  @UseGuards(AuthenticatedGuard)
  async createCustom(
    @Param('id') id: string,
    @Body() createCustomDto: CreateCustomDto,
  ) {
    return await this.resumeService.saveBlock(id, createCustomDto);
  }

  @Post(':id/careers')
  @UseGuards(AuthenticatedGuard)
  async createCareers(
    @Param('id') id: string,
    @Body() createCareersDto: CreateCareersDto,
  ) {
    return await this.resumeService.saveBlock(id, createCareersDto);
  }
}
