import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './post.entity';

@Injectable()
export class CategoryService implements OnModuleInit {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
  ) {}

  async onModuleInit() {
    // 서버가 시작될 때 자동으로 실행
    await this.initRepository();
  }

  async initRepository() {
    const defaultCategories = [
      { name: '자유게시판' },
      { name: '질문게시판' },
      { name: '정보게시판' },
      { name: '공지사항' },
      { name: '문의하기' },
    ];

    for (const category of defaultCategories) {
      const exists = await this.categoryRepository.findOne({ where: { name: category.name } });
      if (!exists) {
        await this.categoryRepository.save(category);
      }
    }
    console.log('Default categories initialized');
  }
}
