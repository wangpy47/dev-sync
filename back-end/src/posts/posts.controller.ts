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
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { GetPostsByCategoryDto } from './dto/category/get-posts-by-category.dto';
import { GetPostsByUserIdDto } from './dto/post/get-posts-by-user-id.dto';
import { UserService } from 'src/user/user.service';
import { CreatePostDto } from './dto/post/create-post.dto';
import { UpdatePostDto } from './dto/post/update-post.dto';
import { AddCommentDto } from './dto/comment/add-comment.dto';
import { UpdateCommentDto } from './dto/comment/update-comment.dto';
import { AuthenticatedGuard } from 'src/auth/auth.guard';

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
  @UseGuards(AuthenticatedGuard)
  async createPost(@Body() createPostDto: CreatePostDto, @Request() req) {
    const user = req.user;

    const { title, content, category } = createPostDto;
    const category_data = await this.postsService.getCategoryByName(category);
    if (!category_data) {
      throw new NotFoundException(`카테고리 '${name}'을(를) 찾을 수 없습니다.`);
    }

    try {
      console.log(title, content, category);
      return await this.postsService.createPost(
        title,
        content,
        category,
        user.user_id,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  // 게시글 삭제
  @Delete('/:id')
  @UseGuards(AuthenticatedGuard)
  async deletePost(@Param('id', ParseIntPipe) id: number) {

    return await this.postsService.deletePost(id);
  }

  // 게시글 수정
  @Patch()
  @UseGuards(AuthenticatedGuard)
  async updatePost(@Body() updatePostDto: UpdatePostDto, @Request() req) {
    const user = req.user;

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
  @UseGuards(AuthenticatedGuard)
  async getLikeStatus(
    @Param('id', ParseIntPipe) post_id: number,
    @Request() req,
  ) {
    const user = req.user;


    const like = await this.postsService.getLike(user.user_id, post_id);
    return like;
  }

  //좋아요 추가/취소 (토글 기능)
  @Post('/:id/like-toggle')
  @UseGuards(AuthenticatedGuard)
  async toggleLike(@Param('id', ParseIntPipe) post_id: number, @Request() req) {
    const user = req.user;
  

    return await this.postsService.toggleLike(user.user_id, post_id);
  }

  // 특정 게시글의 댓글 조회
  @Get('/comment/:post_id')
  async getComments(
    @Param('post_id') post_id: number,
    @Query('page') page: number = 1, // 기본값 1
  ) {
    return await this.postsService.getComment(post_id, page);
  }

  // 댓글 생성
  @Post('/comment')
  @UseGuards(AuthenticatedGuard)
  async addComment(@Body() addCommentDto: AddCommentDto, @Request() req) {
    const user = req.user;

    const { post_id, parent_id, comment } = addCommentDto;

    try {
      return await this.postsService.addComment(
        user.user_id,
        post_id,
        parent_id,
        comment,
      );
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : '댓글 작성 실패',
      );
    }
  }
  // 댓글 수정
  @Patch('/comment')
  @UseGuards(AuthenticatedGuard)
  async updateComment(
    @Body() updateCommentDto: UpdateCommentDto,
    @Request() req,
  ) {
    const user = req.user;
   
    const { comment_id, comment } = updateCommentDto;
    return await this.postsService.updateComment(
      user.user_id,
      comment_id,
      comment,
    );
  }
  // 댓글 삭제
  @Delete('/comment/:id')
  @UseGuards(AuthenticatedGuard)
  async deleteComment(
    @Param('comment_id', ParseIntPipe) comment_id: number,
    @Request() req,
  ) {
    const user = req.user;


    return await this.postsService.deleteComment(user.user_id, comment_id);
  }
}
