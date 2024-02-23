import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  userRegister(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.authService.userRegister(registerUserDto);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  userLogin(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return this.authService.userLogin(loginUserDto);
  }

  @Post('refresh-token')
  getNewToken(
    @Body() { refreshToken }: { refreshToken: string },
  ): Promise<any> {
    return this.authService.getNewToken(refreshToken);
  }
}
