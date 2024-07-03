import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Login } from 'src/dto/login.dto';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from 'src/dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(signUpDto: SignUpDto): Promise<any> {
    const { name, email, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    const token = this.jwtService.sign({ id: user.id });
    console.log(token);

    if(token){
      return "success true";
    }else{
      return "success false";
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Login) {
    const userEntity = await this.userService.findOne({ where: { email: user.email } });
    console.log(userEntity);
    if (!userEntity) {
      return 'User not found';
    }

    const passwordValid = await bcrypt.compare(user.password, userEntity.password);
    if (!passwordValid) {
      return 'Invalid password';
    }

    const token = this.jwtService.sign({ id: userEntity.id });
    return token;
  }
}
