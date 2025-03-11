import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNumber, IsDate, IsUrl, Length } from 'class-validator';

export class CreateTransportDto {
  @ApiProperty({
    example: 1,
    description: 'Haydovchi ID si',
  })
  @IsInt()
  driverId: number;

  @ApiProperty({
    example: 2,
    description: 'Transport turi ID si',
  })
  @IsInt()
  transportTypeId: number;

  @ApiProperty({
    example: 1500,
    description: 'Transport yuk ko‘tarish hajmi (kg)',
  })
  @IsNumber()
  weight: number;

  @ApiProperty({
    example: 12.5,
    description: 'Transport o‘lchamlari (m³)',
  })
  @IsNumber()
  dimensions: number;

  @ApiProperty({
    example: 'Mercedes-Benz Actros',
    description: 'Transport brendi',
  })
  @IsString()
  @Length(2, 100)
  brand: string;

  @ApiProperty({
    example: 'AA123BB',
    description: 'Transport davlat raqami',
  })
  @IsString()
  @Length(5, 15)
  transportNumber: string;

  @ApiProperty({
    example: '2018-01-01T00:00:00.000Z',
    description: 'Transport ishlab chiqarilgan yili',
  })
  years: string;

  @ApiProperty({
    example: 'https://example.com/car.jpg',
    description: 'Transport rasmi URL manzili',
  })
  @IsUrl()
  img: string;

  @ApiProperty({
    example: 'Oq',
    description: 'Transport rangi',
  })
  @IsString()
  @Length(2, 50)
  color: string;

  @ApiProperty({
    example: 'https://example.com/tech-passport-front.jpg',
    description: 'Texnik pasport old tomoni rasmi URL manzili',
  })
  @IsUrl()
  technicalPassportFront: string;

  @ApiProperty({
    example: 'https://example.com/tech-passport-back.jpg',
    description: 'Texnik pasport orqa tomoni rasmi URL manzili',
  })
  @IsUrl()
  technicalPassportBack: string;

  @ApiProperty({
    example: 'A12345678',
    description: 'Texnik pasport seriya raqami',
  })
  @IsString()
  @Length(5, 20)
  technicalSeriaNumber: string;
}
