import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';

import { GoogleAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Get('status')
  getAuthStatus(@Request() req) {
    if (req.isAuthenticated()) {
      // 세션이 유효하면 유저 정보 반환
      return req.user;
    } else {
      // 세션이 유효하지 않으면 null 또는 에러 반환
      return { message: 'Not authenticated' };
    }
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req, @Response() res) {
    const { user } = req;
    if (user) {
      // 로그인 성공 시 세션에 유저 정보 저장
      console.log('Google Auth successful:', user);
      return res.redirect('http://localhost:4000/'); // 원하는 경로로 리디렉션
    } else {
      console.log('Google Auth failed');
      return res.status(403).send('Authentication failed');
    }
  }
}
