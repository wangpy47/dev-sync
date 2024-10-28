import {
  Controller,
  Body,
  Get,
  Post,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer'; 

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Get('/getUser')
  async getUser(@Request() req) {
    if (req.isAuthenticated()) {
      const user = await this.userService.getUser(req.user.email);
      return user;
    } else {
      return null;
    }
  }

  @Post('/updateProfile')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async updateProfile(@Request() req, @UploadedFile() file: Express.Multer.File) {
    const email = req.user?.email; // 세션에서 이메일 가져오기
  
    if (req.isAuthenticated() && email) {
      if (!file) {
        throw new Error('파일이 전송되지 않았습니다.');
      }
      return this.userService.updateProfile(email, file);
    } else {
      return { error: '인증된 회원이 아니거나 이메일이 일치하지 않습니다.' };
    }
  }


  @Post('/update')
  updateUser(@Request() req, @Body() user: UpdateUserDto) {
    if (req.isAuthenticated() && req.user.email === user.email) {
      return this.userService.updateUser(user);
    } else {
      return { error: '인증된 회원이 아닙니다.' };
    }
  }



}
