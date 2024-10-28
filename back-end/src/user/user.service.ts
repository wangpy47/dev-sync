import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './user.dto';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // 사용자 생성
  createUser(user): Promise<User> {
    return this.userRepository.save(user);
  }

  // 사용자 조회
  async getUser(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  // 사용자 업데이트 (프로필 이미지 포함)
  async updateUser(updateUserDto: Partial<UpdateUserDto>) {
    const email = updateUserDto.email;
  
    if (!email) {
      throw new HttpException('이메일이 필요합니다.', HttpStatus.BAD_REQUEST);
    }
  
    const user = await this.userRepository.findOne({ where: { email } });
  
    if (!user) {
      throw new HttpException('사용자를 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
    }
  
    const { profileImageUrl, ...restDto } = updateUserDto;
    Object.assign(user, restDto);

    return this.userRepository.save(user);
  }


  async updateProfile(email: string, file?: Express.Multer.File) {
    if (!email) {
      throw new HttpException('이메일이 필요합니다.', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('사용자를 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
    }

    // 파일이 있는 경우에만 프로필 이미지 URL 업데이트
    if (file) {
      const encodedFileName = encodeURIComponent(file.originalname);
      const uniqueFilename = `${uuidv4()}-${encodedFileName}`;
      const newPath = `./uploads/${uniqueFilename}`;

      if (!fs.existsSync('./uploads')) {
        fs.mkdirSync('./uploads');
      }

      if (file.buffer) {
        // 버퍼로 파일을 저장하고 새로운 이미지 URL 설정
        fs.writeFileSync(newPath, file.buffer);
        user.profileImageUrl = `http://localhost:3000/uploads/${uniqueFilename}`;
      } else {
        console.error('파일 버퍼가 존재하지 않습니다.');
        throw new HttpException('파일 전송 실패', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else {
      throw new HttpException('파일이 제공되지 않았습니다.', HttpStatus.BAD_REQUEST);
    }

    return this.userRepository.save(user);
  }


  // 이메일로 사용자 조회 후 없으면 저장
  async findByEmailOrSave(email, username, providerId) {
    const foundUser = await this.getUser(email);
    if (foundUser) {
      return foundUser;
    }
    const newUser = this.userRepository.create({
      email,
      username,
      providerId,
    });
    return this.userRepository.save(newUser);
  }

  // 사용자 삭제
  deleteUser(email: any) {
    return this.userRepository.delete({ email });
  }
}
