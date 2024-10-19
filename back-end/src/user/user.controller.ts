import {
  Controller,
  Body,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Patch,
  UseGuards,
  HttpException,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UpdateUserProfileDto } from './user.dto';
import { GoogleAuthGuard } from 'src/auth/auth.guard';

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

  @Put('/update/:email')
  updateUser(@Param('email') email: string, @Body() user: UpdateUserDto) {
    console.log(user);
    return this.userService.updateUser(email, user);
  }

  @Delete('/delete/:email')
  deleteUser(@Param('email') email: string) {
    return this.userService.deleteUser(email);
  }

  @UseGuards(GoogleAuthGuard) // 로그인된 상태에서만 허용
  @Patch('/updateProfile/:email')
  async updateUserProfile(
    @Param('email') email: string,
    @Body() userProfile: UpdateUserProfileDto,
    @Request() req,
  ) {
    console.log('req.user.email !== email', req.user.email, email);
    if (req.user.email !== email) {
      // 로그인된 유저가 업데이트하려는 유저와 다를 경우 권한 없음 처리
      throw new HttpException('권한이 없습니다.', HttpStatus.FORBIDDEN);
    }

    return this.userService.updateUser(email, userProfile);
  }
}
