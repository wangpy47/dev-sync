import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';


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
      { category: '자유게시판' },
      { category: '질문게시판' },
      { ㅍcategory: '정보게시판' },
      { category: '공지사항' },
      { category: '문의하기' },
      { category: 'default'}
    ];

    for (const category of defaultCategories) {
      const exists = await this.categoryRepository.findOne({ where: { category: category.category } });
      if (!exists) {
        await this.categoryRepository.save(category);
      }
    }
    console.log('Default categories initialized');
  }
}
