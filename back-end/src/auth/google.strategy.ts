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
      scope: ['email', 'profile', 'openid'],
      accessType: 'offline',
      prompt: 'consent',  // 항상 사용자에게 동의를 요청하고 로그인 창 표시
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
      );
    } 
    return user;
  }
}
