import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { GetPostsByCategoryDto } from './dto/category/get-posts-by-category.dto';
import { Post } from './entities/post.entity';
import { Category } from './entities/category.entity';
import { Like } from './entities/like.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Like) private likeRepository: Repository<Like>,
  ) {}

  //-----------------------------------category----------------------------------------------------

  // 모든 카테고리 조회
  async getCategories() {
    return await this.categoryRepository.find();
  }

  // 카테고리 이름으로 단일 카테고리 조회
  async getCategoryByName(category: string) {
    return await this.categoryRepository.findOne({ where: { category } });
  }

  // 카테고리 ID로 단일 카테고리 조회
  private async findCategoryById(category_id: number) {
    const category = await this.categoryRepository.findOne({
      where: { category_id },
    });
    if (!category) {
      throw new NotFoundException(
        `ID가 ${category_id}인 카테고리를 찾을 수 없습니다.`,
      );
    }
    return category;
  }

  // 특정 카테고리에 속한 게시글 조회
  async getPostsByCategory(getPostsByCategoryDto: GetPostsByCategoryDto) {
    const { category } = getPostsByCategoryDto;

    const category_data = await this.categoryRepository.findOne({
      where: { category },
      relations: ['posts'],
    });
    if (!category_data) {
      throw new NotFoundException(
        `NAME이 ${category}인 카테고리를 찾을 수 없습니다.`,
      );
    }
    return category_data.posts;
  }

  //-----------------------------------post----------------------------------------------------
  // 모든 게시글 조회
  async getAllPosts() {
    return await this.postRepository.find({ relations: ['user', 'category'] });
  }

  // 게시글 ID로 조회
  private async findPostById(post_id: number) {
    const post = await this.postRepository.findOne({ where: { post_id } });
    if (!post) {
      throw new NotFoundException(
        `ID가 ${post_id}인 게시글을 찾을 수 없습니다.`,
      );
    }
    return post;
  }

  // 유저 아이디로 게시글 조회
  async getPostsByUserId(user_id: number) {
    return await this.postRepository.find({
      where: { user: { user_id } },
      relations: ['user', 'category'],
    });
  }

  // 게시글 생성
  async createPost(
    title: string,
    content: string,
    category_name: string,
    user_id: number,
  ) {
    const category = await this.getCategoryByName(category_name);

    const user = await this.userRepository.findOne({ where: { user_id } });
    if (!user) {
      throw new NotFoundException(
        `ID가 ${user_id}인 사용자를 찾을 수 없습니다.`,
      );
    }

    const newPost = this.postRepository.create({
      title,
      content,
      category,
      user,
    });

    return await this.postRepository.save(newPost);
  }

  // 게시글 삭제
  async deletePost(post_id: number) {
    const post = await this.findPostById(post_id);
    return await this.postRepository.remove(post);
  }

  // 게시글 조회수 증가
  async increaseViewCount(post_id: number) {
    const post = await this.findPostById(post_id);
    post.viewCount += 1;
    return await this.postRepository.save(post);
  }
  //게시글 업데이트
  async updatePost(
    user_id: number, // 요청한 유저의 ID
    updates: {
      post_id: number;
      category?: string;
      title?: string;
      content?: string;
    },
  ) {
    const post = await this.findPostById(updates.post_id);

    // 작성자인지 확인
    if (post.user.user_id !== user_id) {
      throw new BadRequestException('수정 권한이 없습니다.');
    }

    // 제목 수정
    if (updates.title) {
      post.title = updates.title;
    }

    // 내용 수정
    if (updates.content) {
      post.content = updates.content;
    }

    // 카테고리 변경 (카테고리 이름으로 ID 조회)
    if (updates.category) {
      const category = await this.getCategoryByName(updates.category);
      if (!category) {
        throw new NotFoundException(
          `카테고리 '${updates.category}'를 찾을 수 없습니다.`,
        );
      }
      post.category = category;
    }

    return await this.postRepository.save(post);
  }

  // 조회수 상위 n개 게시글 조회
  async getTopPosts(n: number) {
    return await this.postRepository.find({
      order: { viewCount: 'DESC' },
      take: n,
    });
  }

  //-----------------------------------like----------------------------------------------------

  async getLike(user_id: number, post_id: number) {
    return await this.likeRepository.findOne({
      where: { user: { user_id }, post: { post_id } },
    });
  }
  async getLikeCount(post_id: number) {
    return await this.likeRepository.count({ where: { post: { post_id } } });
  }

  async toggleLike(user_id: number, post_id: number) {
    const existingLike = await this.getLike(user_id, post_id);

    if (existingLike) {
      // 2️⃣ 이미 좋아요가 존재하면 삭제
      await this.removelike(user_id, post_id);
    } else {
      // 3️⃣ 좋아요 추가
      return await this.addlike(user_id, post_id);
    }
  }

  private async addlike(user_id: number, post_id: number) {
    const user = await this.userRepository.findOne({ where: { user_id } });
    if (!user) {
      throw new Error('해당 유저가 존재하지 않음');
    }

    const post = await this.postRepository.findOne({ where: { post_id } });
    if (!post) {
      throw new Error('해당 게시물이 존재하지 않음');
    }

    const like = new Like();
    like.user = user;
    like.post = post;

    await this.likeRepository.save(like);

    return { message: '좋아요 성공' };
  }

  private async removelike(user_id: number, post_id: number) {
    const like = await this.likeRepository.findOne({
      where: { user: { user_id }, post: { post_id } },
    });

    if (!like) {
      throw new Error('좋아요가 없음');
    }

    await this.likeRepository.remove(like);

    return { message: '좋아요 취소' };
  }
}
