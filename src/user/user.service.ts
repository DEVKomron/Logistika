import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
    
) {}


async create(createUserDto: CreateUserDto) {
  const { hashed_password, ...userData } = createUserDto;

  if (!hashed_password) {
    throw new BadRequestException('Password is required');
  }

  const hashedPassword = await bcrypt.hash(hashed_password, 7);
  const activationLink = uuidv4(); 

  const user = await this.prismaService.user.create({
    data: {
      ...userData,
      hashed_password: hashedPassword,
      link:activationLink,
      is_active: false 
    },
  });


  const activationUrl = `3.78.122.117/user/activate/${activationLink}`;
  await this.mailService.sendActivationEmail(user.email, activationUrl);

  return {
    message: 'User created. Activation email sent.',
    userId: user.id,
  };
}

async activate(link: string) {
  console.log("hello2");

  if (!link) {
    throw new BadRequestException("Activation link not found");
  }
  const driver = await this.prismaService.user.findFirst({
    where: {
      link,
      is_active: false,
    },
  });
  
  if (!driver) {
    throw new BadRequestException("driver already activates or link is invalid");
  }

  const updateDriver = await this.prismaService.user.update({
    where: { id: driver.id },
    data: { is_active: true },
  });

  const response = {
    message: "User activated successfully",
    driver: updateDriver.is_active,
  };

  return response;
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
