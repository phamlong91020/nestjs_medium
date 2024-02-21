import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // create new user
  async createNewUser(user: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  // get all user
  async findAllUser(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // get user by id
  async findUserById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  // update user by id
  async updateUserById(id: number, user: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, user);
    return await this.userRepository.findOne({ where: { id } });
  }

  // delete user by id
  async deleteUserById(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
