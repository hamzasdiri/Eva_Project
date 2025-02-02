// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { AuthResponse } from './dto/auth-response.dto';

// src/auth/auth.service.ts
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<AuthResponse> {
    if (!signupDto || !signupDto.email || !signupDto.password) {
      throw new Error('Missing email or password');
    }

    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    const user = this.userRepository.create({
      ...signupDto,
      password: hashedPassword,
    });

    await this.userRepository.save(user);
    return this.createToken(user);
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.createToken(user);
  }

  private createToken(user: User): AuthResponse {
    const payload = { sub: user.id, email: user.email };
    const authResponse = new AuthResponse();
    authResponse.accessToken = this.jwtService.sign(payload);
    authResponse.userId = user.id; // Explicitly set userId
    return authResponse;
  }
}
