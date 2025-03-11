import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
) {}

async create(createUserDto: CreateUserDto) {
  const { hashed_password,  ...data } = createUserDto;
  if (!hashed_password) {
      throw new BadRequestException("parollar mos emas");
  }

  const hashedPassword = await bcrypt.hash(hashed_password, 7);

  return this.prismaService.user.create({
      data: { ...data, hashed_password: hashedPassword },
  });
}

  findAll() {
    return this.prismaService.user.findMany({include: {cargo:true, order:true, payment:true}});
  }

  findOne(id: number) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
        where: { email },
    });
   
    
    return user;
}

  remove(id: number) {
    return this.prismaService.user.delete({ where: { id } });
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string | null) {
    const updatedUser = await this.prismaService.user.update(
        {
          where: { id },
          data: { hashed_refresh_token: hashed_refresh_token ?? undefined },
        }
    );

    return updatedUser;
  }
}
