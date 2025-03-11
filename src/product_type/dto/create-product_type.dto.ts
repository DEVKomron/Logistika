import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductTypeDto {
  @ApiProperty({ example: 'Elektr jihozlari', description: 'Mahsulot turi nomi' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Elektronika mahsulotlari uchun mahsulot turi', description: 'Mahsulot turi haqida tavsif' })
  @IsNotEmpty()
  @IsString()
  description: string;
}
