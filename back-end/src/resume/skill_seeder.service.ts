import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillModel } from './entities/skill.entity';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class SkillSeederService implements OnModuleInit {
  private readonly logger = new Logger(SkillSeederService.name);

  constructor(
    @InjectRepository(SkillModel)
    private readonly skillRepository: Repository<SkillModel>,
  ) {}

  async onModuleInit() {
    this.logger.log(' Initializing Skill Table with Devicon data...');

    try {
      const skills = await this.fetchDeviconSkills();
 
      

      for (const { name, icon } of skills) {
        const existing = await this.skillRepository.findOne({
          where: { name },
        });

        if (!existing) {
          const skill = this.skillRepository.create({ name, icon });
          await this.skillRepository.save(skill);
        } else if (!existing.icon) {
          existing.icon = icon;
          await this.skillRepository.save(existing);
        }
      }

      
    } catch (error) {
      this.logger.error('Failed to initialize skills', error);
    }
  }

  private async fetchDeviconSkills(): Promise<
    { name: string; icon: string }[]
  > {
    const url =
      'https://raw.githubusercontent.com/devicons/devicon/master/devicon.json';

    const response = await axios.get(url);
    const data = response.data;

    const skills: { name: string; icon: string }[] = [];

    for (const item of data) {
      if (!item.name) continue;

      const fontIcon = item?.versions?.font?.plain?.[0];
      const svgIcon =
        item?.versions?.svg?.plain?.[0] || item?.versions?.svg?.[0];

      const iconClass =
        fontIcon || svgIcon
          ? `devicon-${item.name}-${fontIcon || svgIcon}`
          : null;

      if (iconClass) {
        skills.push({
          name: item.name,
          icon: iconClass,
        });
      }
    }

    return skills;
  }
}
