import { Controller, Get, Request, Response, UseFilters, UseGuards } from '@nestjs/common';

import { GoogleAuthGuard } from './auth.guard';
import { AuthExceptionFilter } from './auth-exception.filter';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Get('status')
  getAuthStatus(@Request() req) {
    if (req.isAuthenticated()) {
      // 세션이 유효하면 유저의 이메일만 반환
      return req.user.email;
    } else {
      // 세션이 유효하지 않으면 에러 메시지 반환
      return 'Not authenticated';
    }
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @UseFilters(AuthExceptionFilter)
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

  @Get('logout')
  logout(@Request() req, @Response() res) {
    console.log('logout');
    req.logout((err) => {
      if (err) {
        return res.status(500).send('Logout failed');
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).send('Failed to destroy session');
        }
        res.clearCookie('connect.sid', { path: '/' }); // 세션 쿠키 명시적으로 삭제
        return res.status(200).send('Logged out');
      });
    });
  }
}
