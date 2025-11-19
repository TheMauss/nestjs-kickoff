import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

class SignupDto {
  email: string;
  password: string;
  name?: string;
}

class SigninDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto.email, dto.password, dto.name);
  }

  @Post('signin')
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto.email, dto.password);
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }
}
