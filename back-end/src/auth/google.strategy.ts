import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google',
      scope: ['email', 'profile', 'openid'], // 기본적인 사용자 정보 스코프
      accessType: 'offline', // 리프레시 토큰 발급을 위한 설정
      // prompt: 'consent',  // 항상 승인을 요청하지 않음
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, name, emails } = profile;
    const providerId = id;
    const email = emails[0].value;
    let user: User = await this.userService.getUser(email);
    if (!user) {
      user = await this.userService.findByEmailOrSave(
        email,
        name.familyName + name.givenName,
        providerId,
        accessToken, // 액세스 토큰 저장
        refreshToken, // 리프레시 토큰 저장
      );
    } else if (!user.refreshToken) {
      user.refreshToken = refreshToken; // 처음 리프레시 토큰이 없으면 업데이트
      await this.userService.updateUser(email, user);
    }

    return user;
  }
}
