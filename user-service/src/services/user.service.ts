import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserDTO } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(userDto: UserDTO) {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = this.userRepository.create({ ...userDto, password: hashedPassword });
    return this.userRepository.save(user);
  }

  async login(userDto: UserDTO) {
    const user = await this.userRepository.findOne({ email: userDto.email });
    if (!user || !(await bcrypt.compare(userDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = jwt.sign({ userId: user.id }, 'secret-key', { expiresIn: '1h' });
    return { token };
  }

  async getProfile(userId: string) : Promise<User> {
    const user = await this.userRepository.findOne({
      where: {userId: userId }, // Use "findOne" with options
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}