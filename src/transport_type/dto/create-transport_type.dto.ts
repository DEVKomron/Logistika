import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, Length } from 'class-validator';

export class CreateTransportTypeDto {
  @ApiProperty({
    example: 'Yuk Mashinasi',
    description: 'Transport turi nomi',
  })
  @IsString()
  @Length(2, 50)
  name: string;

  @ApiProperty({
    example: 'Og‘ir yuk tashish uchun mo‘ljallangan transport turi',
    description: 'Transport turi haqida tavsif',
  })
  @IsString()
  @Length(5, 255)
  description: string;

  @ApiProperty({
    example: true,
    description: 'Muzlatgich mavjudligi',
  })
  @IsBoolean()
  refrigerator: boolean;
}
