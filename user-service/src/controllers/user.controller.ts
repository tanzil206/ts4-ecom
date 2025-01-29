import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthGuard } from '../middleware/auth.middleware';
import { UserDTO } from '../dto/user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() userDto: UserDTO) {
    return this.userService.register(userDto);
  }

  @Post('login')
  async login(@Body() userDto: UserDTO) {
    return this.userService.login(userDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Body('userId') userId: string) {
    return this.userService.getProfile(userId);
  }
}