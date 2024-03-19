import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAllUser(): Promise<User[]> {
    return this.userService.findAllUser();
  }

  @Get(':id')
  findOneUser(@Param('id') id: string): Promise<User> {
    return this.userService.findOneUser(Number(id));
  }
}
