import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, Post } from './post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';



@Injectable()
export class PostsService {

    constructor(@InjectRepository(Post) private postRepository:Repository<Post>, @InjectRepository(Category) private categoryRepository:Repository<Category>, @InjectRepository(User) private userRepository:Repository<User>) {}


    //-----------------------------------category----------------------------------------------------

    // 모든 카테고리 조회
    async getCategories() {
        return await this.categoryRepository.find();
    }

    // 카테고리 이름으로 조회
    async getCategoryByName(name: string) {
        return await this.categoryRepository.findOne({where: {name}});
    }

    // 카테고리 생성
    private async findCategoryById(category_id: number) {
        const category = await this.categoryRepository.findOne({ where: { category_id } });
        if (!category) {
            throw new NotFoundException(`ID가 ${category_id}인 카테고리를 찾을 수 없습니다.`);
        }
        return category;
    }

    // 카테고리 이름으로 조회
    async getPostsByCategory(name: string) {
        const category = await this.categoryRepository.findOne({
            where: { name },
            relations: ['posts'], 
        });
        if (!category) {
            throw new NotFoundException(`NAME이 ${name}인 카테고리를 찾을 수 없습니다.`);
        }
        return category.posts; 
    }




    //-----------------------------------post----------------------------------------------------
    // 모든 게시글 조회
    async getPosts() {
        return await this.postRepository.find({ relations: ['user', 'category'] });
    }
    
    // 게시글 ID로 조회
    private async findPostById(post_id: number) {
        const post = await this.postRepository.findOne({ where: { post_id } });
        if (!post) {
            throw new NotFoundException(`ID가 ${post_id}인 게시글을 찾을 수 없습니다.`);
        }
        return post;
    }

    // 유저 이름으로 게시글 조회
    async getPostsByUserId(user_id: number) {
        return await this.postRepository.find({
          where: { user: { user_id } }, 
          relations: ['user', 'category'], 
        });
      }
      



    // 게시글 생성
    async createPost(title: string, content: string, category_id: number, user_id: number) {
        const category = await this.findCategoryById(category_id);
      
        const user = await this.userRepository.findOne({ where: { user_id } });
        if (!user) {
          throw new NotFoundException(`ID가 ${user_id}인 사용자를 찾을 수 없습니다.`);
        }
      
        const newPost = this.postRepository.create({
          title,
          content,
          category,
          user, 
        });
      
        return await this.postRepository.save(newPost);
      }
      

    // 계시글 업데이트
    async updatePost(post_id: number, title: string, content: string) {
        const post = await this.findPostById(post_id);
        post.title = title;
        post.content = content;
        return await this.postRepository.save(post);
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

    // 게시글 카테고리 변경
    async changeCategory(post_id: number, category_id: number) {
        const post = await this.findPostById(post_id);
        const category = await this.findCategoryById(category_id);
        post.category = category;
        return await this.postRepository.save(post);
    }

    // 조회수 상위 n개 게시글 조회
    async getTopPosts(n: number) {
        return await this.postRepository.find({order: {viewCount: 'DESC'}, take: n});
    }

}
