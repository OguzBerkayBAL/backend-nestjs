import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from '../dto/user.dto';
import { FilterOperator, FilterSuffix, PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import * as bcrypt from 'bcryptjs'; // Import bcrypt library

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.userRepository, {
      sortableColumns: ['name', 'email'],
      nullSort: 'last',
      defaultSortBy: [['name', 'DESC']],
      searchableColumns: ['name', 'email'],
      select: ['name', 'email'],
      filterableColumns: {
        email: [FilterOperator.EQ, FilterSuffix.NOT],
        name: true,
      },
      relations: { company: true },
    });
  }

  async findOne(options: FindOneOptions<User>): Promise<any> {
    const user = await this.userRepository.findOne(options);
    return user;
  }

  // async createUser(createUserDto: UserDTO) {
  //   const newUser = await this.userRepository.create(createUserDto);
  //   await this.userRepository.save({
  //     name: createUserDto.name,
  //     email: createUserDto.email,
  //     password: createUserDto.password,
  //   });
  //   return newUser;
  // }
  async updatePassword(email: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    // Parolayı hash'le
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UserDTO): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  async delete(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      return null;
    }

    await this.userRepository.remove(user);
    return user;
  }
}
