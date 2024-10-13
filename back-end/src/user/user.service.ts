import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto, UpdateUserProfileDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  //createUser
  createUser(user): Promise<User> {
    return this.userRepository.save(user);
  }

  //select one user
  async getUser(email: string) {
    const result = await this.userRepository.findOne({ where: { email } });
    return result;
  }

  async updateUser(
    email: string,
    updateUserDto: Partial<UpdateUserDto | UpdateUserProfileDto>,
  ) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException(
        '사용자를 찾을 수 없습니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(user, updateUserDto); // 받은 정보를 유저 엔터티에 업데이트
    return this.userRepository.save(user);
  }

  async findByEmailOrSave(
    email,
    username,
    providerId,
    accessToken,
    refreshToken,
  ) {
    const foundUser = await this.getUser(email);
    if (foundUser) {
      return foundUser;
    }
    const newUser = await this.userRepository.save({
      email,
      username,
      providerId,
      accessToken,
      refreshToken,
    });
    return newUser;
  }

  //delete userInfo
  deleteUser(email: any) {
    return this.userRepository.delete({ email });
  }
}
