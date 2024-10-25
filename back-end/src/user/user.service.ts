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
  async updateUser(updateUserDto: Partial<User>, file?: Express.Multer.File) {
    const email = updateUserDto.email;

    // 이메일이 없을 경우 예외 발생
    if (!email) {
      throw new HttpException('이메일이 필요합니다.', HttpStatus.BAD_REQUEST);
    }

    // 사용자 조회
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('사용자를 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
    }

    // 파일 처리 로직
    if (file) {
      console.log('파일 정보:', file); // 파일 정보 로그 출력

      // 한글 파일명 처리를 위한 인코딩
      const encodedFileName = encodeURIComponent(file.originalname);
      const uniqueFilename = `${uuidv4()}-${encodedFileName}`;
      const newPath = `./uploads/${uniqueFilename}`;

      // 파일이 이미 존재하는지 확인
      if (!fs.existsSync(newPath)) {
        if (!fs.existsSync('./uploads')) {
          fs.mkdirSync('./uploads');
        }

        if (file.buffer) {
          // 파일을 버퍼로 저장
          fs.writeFileSync(newPath, file.buffer);
          user.profileImageUrl = `http://localhost:3000/uploads/${uniqueFilename}`;
        } else {
          console.error('파일 버퍼가 존재하지 않습니다.');
          throw new HttpException('파일 전송 실패', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      } else {
        // 파일이 이미 존재하는 경우 처리
        user.profileImageUrl = `http://localhost:3000/uploads/${uniqueFilename}`;
      }
    }

    // 나머지 사용자 정보 업데이트
    Object.assign(user, updateUserDto);
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
