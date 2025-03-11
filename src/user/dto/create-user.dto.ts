import { IsEmail, IsEnum, IsBoolean, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ example: '+998901234567' })
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty({ example: 'Ali' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Valiyev' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'ali.valiyev@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'https://t.me/username' })
  @IsNotEmpty()
  @IsString()
  tg_link: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({ example: 'user' , default: 'user' })
  role?:Role;

  @ApiProperty({ example: 'parol' })
  @IsNotEmpty()
  @IsString()
  hashed_password: string;
}


