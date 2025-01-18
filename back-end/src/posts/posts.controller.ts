import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { GetPostsByCategoryDto } from './dto/category/get-posts-by-category.dto';

@Controller('posts')
export class PostsController {

    constructor(private readonly postsService:PostsService){}

    //모든 카테고리 조회
    @Get('/categories')
    async getCateGories(){
        return this.postsService.getCategories();
    }


    // 카테고리 이름으로 게시글 조회
    @Get('/:name/posts') 
    async getPostsByCategory(@Param() params: GetPostsByCategoryDto) {
        return await this.postsService.getPostsByCategory(params);
    }

}
