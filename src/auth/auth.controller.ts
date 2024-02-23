import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  userRegister(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.authService.userRegister(registerUserDto);
  }
}
