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

  @Post('/update')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() })) 
  async updateUser(@Request() req, @UploadedFile() file: Express.Multer.File) {
    const updateUserDto = req.body;

    if (req.isAuthenticated() && req.user.email === updateUserDto.email) {
      // 파일이 전송되지 않았을 경우 처리
      if (!file) {
        console.error('파일이 전송되지 않았습니다.');
        throw new Error('파일이 전송되지 않았습니다.');
      }

      // 사용자 정보 업데이트 서비스 호출
      return this.userService.updateUser(updateUserDto, file);
    } else {
      // 인증되지 않거나 이메일이 일치하지 않을 경우 예외 처리
      return { error: '인증된 회원이 아니거나 이메일이 일치하지 않습니다.' };
    }
  }
}
