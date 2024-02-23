import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // User register
  async userRegister(registerUserDto: RegisterUserDto): Promise<User> {
    const hashedPassword = await this.hashPassword(registerUserDto.password);
    return await this.userRepository.save({
      ...registerUserDto,
      password: hashedPassword,
    });
  }

  // User login
  async userLogin(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });
    if (!user) {
      throw new HttpException('Email is not exist', HttpStatus.UNAUTHORIZED);
    }
    const checkPass = bcrypt.compareSync(loginUserDto.password, user.password);
    if (!checkPass) {
      throw new HttpException(
        'Password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }
    // Generate access token and Refresh token
    const payload = { id: user.id, email: user.email };
    return this.generateToken(payload);
  }

  // Refresh token
  // Khi mà Access token hết hạn thì dùng api này để get token mới
  async getNewToken(refreshToken: string): Promise<any> {
    try {
      const user = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.SECRET_KEY,
      });
      const checkExistToken = await this.userRepository.findOneBy({
        email: user.email,
        refreshToken,
      });
      if (checkExistToken) {
        return this.generateToken({ id: user.id, email: user.email });
      } else {
        throw new HttpException(
          'Refresh token is not valid',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      throw new HttpException(
        'Refresh token is not valid',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  // Hàm generate Access token và Refresh token
  private async generateToken(payload: { id: number; email: string }) {
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.SECRET_KEY,
      expiresIn: process.env.EXPIRATION_TIME,
    });
    await this.userRepository.update(
      { email: payload.email },
      { refreshToken: refreshToken },
    );
    return { accessToken, refreshToken };
  }

  // Hàm hash password
  private async hashPassword(password: string): Promise<string> {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
