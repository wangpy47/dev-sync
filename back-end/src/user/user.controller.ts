import {
  Controller,
  Body,
  Get,
  Post,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';


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

  @Post('/update/')
  updateUser(@Request() req, @Body() user: UpdateUserDto) {
    if (req.isAuthenticated() && req.user.email === user.email) {
      return this.userService.updateUser(user);
    } else {
      return { error: '인증된 회원이 아닙니다.' };
    }
  }
}
