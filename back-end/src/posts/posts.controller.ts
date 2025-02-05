import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { GetPostsByCategoryDto } from './dto/category/get-posts-by-category.dto';
import { GetPostsByUserIdDto } from './dto/post/get-posts-by-user-id.dto';
import { UserService } from 'src/user/user.service';
import { CreatePostDto } from './dto/post/create-post.dto';
import { UpdatePostDto } from './dto/post/update-post.dto';


@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly userService: UserService,
  ) {}

  //모든 카테고리 조회
  @Get('/categories')
  async getCateGories() {
    return this.postsService.getCategories();
  }

  // 모든 게시글 조회
  @Get()
  async getAllPosts() {
    return this.postsService.getAllPosts();
  }

  // 카테고리 이름으로 게시글 조회
  @Get('/categories/:category')
  async getPostsByCategory(@Param() params: GetPostsByCategoryDto) {
    return await this.postsService.getPostsByCategory(params);
  }

  // 유저 이메일로 게시글 조회
  @Get('/users/:email')
  async getPostsByUserId(@Param() params: GetPostsByUserIdDto) {
    const user = await this.userService.getUser(params.email);
    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }
    return await this.postsService.getPostsByUserId(user.user_id);
  }

  // 조회수 상위 n개 게시글 조회
  @Get('/top')
  async getTopPosts(@Query('n', ParseIntPipe) n: number) {
    return await this.postsService.getTopPosts(n);
  }

  // 게시글 생성
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto, @Request() req) {
    const user = req.session?.user; 
    if (!user) {
      throw new BadRequestException('인증된 사용자가 아닙니다.');
    }

    const { title, content, category } = createPostDto;
    const category_data=await this.postsService.getCategoryByName(category);
    if (!category_data) {
        throw new NotFoundException(`카테고리 '${name}'을(를) 찾을 수 없습니다.`);
      }
      
    try {
        console.log(title, content, category )
      return await this.postsService.createPost(title, content, category, user.user_id);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  // 게시글 삭제
  @Delete('/:id')
  async deletePost(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.deletePost(id);
  }

  @Patch()
  async updatePost(
    @Body() updatePostDto: UpdatePostDto,
    @Request() req, 
  ) {
    const user = req.session?.user; 
    if (!user) {
      throw new BadRequestException('인증된 사용자가 아닙니다.');
    }

    return await this.postsService.updatePost(user.user_id, updatePostDto);
  }

  // 게시글 조회수 증가
  @Patch('/:id/view')
  async increaseViewCount(@Param('id', ParseIntPipe) post_id: number) {
    return await this.postsService.increaseViewCount(post_id);
  }


  //특정 게시글의 좋아요 개수 조회
  @Get('/:id/likes/count')
  async getLikeCount(@Param('id', ParseIntPipe) post_id: number) {
    return await this.postsService.getLikeCount(post_id);
  }

  // 특정 게시글에서 현재 유저가 좋아요를 눌렀는지 확인
  @Get('/:id/likes/status')
  async getLikeStatus(@Param('id', ParseIntPipe) post_id: number, @Request() req) {
    const user = req.session?.user;
    if (!user) {
      throw new BadRequestException('인증된 사용자가 아닙니다.');
    }
    
    const like = await this.postsService.getLike(user.user_id, post_id);
    return like; 
  }

  //좋아요 추가/취소 (토글 기능)
  @Post('/:id/like-toggle')
  async toggleLike(@Param('id', ParseIntPipe) post_id: number, @Request() req) {
    const user = req.session?.user;
    if (!user) {
      throw new BadRequestException('인증된 사용자가 아닙니다.');
    }
    
    return await this.postsService.toggleLike(user.user_id, post_id);
  }

}
