import { UserInfo } from 'src/utils/userInfo.decorator';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user') // url 3000/user/~
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return await this.userService.signup(
      signupDto.email,
      signupDto.password,
      signupDto.passwordCheck,
      signupDto.name,
      signupDto.role,
      signupDto.point,
    );
  }

  @Post('signin')
  async signin(@Body() signinDto: SigninDto) {
    return await this.userService.signin(signinDto.email, signinDto.password);
  }

  // @UseGuards(RolesGuard)
  @Get('profile')
  async getProfile(@UserInfo() user: User) {
    return await this.userService.getProfile(user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('email')
  getEmail(@UserInfo() user: User) {
    return { email: user.email };
  }
}
