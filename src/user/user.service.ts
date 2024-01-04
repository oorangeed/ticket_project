import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';

import _ from 'lodash';

import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { Role } from './type/userRole.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userReposiroty: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findByEmail(email: string) {
    return await this.userReposiroty.findOneBy({ email });
  }

  // 회원가입
  async signup(
    email: string,
    password: string,
    passwordCheck: string,
    name: string,
    role: Role,
    point: number,
    phone: string,
    adress: string,
  ) {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('이미 사용중인 이메일입니다.');
    }

    //시간되면 특문 영어 설정하기
    if (password.length < 8) {
      throw new BadRequestException('비밀번호는 8자리 이상으로 입력해주세요.');
    }

    if (password !== passwordCheck) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }

    const hashedPassword = await hash(password, 10);
    await this.userReposiroty.save({
      email,
      password: hashedPassword,
      name,
      role,
      point,
      phone,
      adress,
    });
  }

  // 로그인
  async signin(email: string, password: string) {
    const user = await this.userReposiroty.findOne({
      select: ['id', 'email', 'password'],
      where: { email },
    });
    if (_.isNil(user)) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }
    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    const payload = { email, sub: user.id }; // user.id가 고유식별자
    return { access_token: this.jwtService.sign(payload) };
  }

  // 프로필 조회
  async getProfile(userId: number) {
    const user = await this.userReposiroty.findOne({
      select: ['email', 'name', 'point', 'phone', 'adress'],
      where: { id: userId },
    });

    if (_.isNil(user)) {
      throw new NotFoundException('사용자가 존재하지 않습니다.');
    }
    return user;
  }
}
