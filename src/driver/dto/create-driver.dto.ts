import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateDriverDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty({ example: 4.5, description: 'Driver rating' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  rating: number;

  @ApiProperty({ example: true, description: 'Driver status' })
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @ApiProperty({ example: '01A123AA', description: 'Vehicle number' })
  @IsNotEmpty()
  @IsString()
  vehice_number: string;

  @ApiProperty({ example: 5, description: 'Years of experience' })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  experience_year: number;

  @ApiProperty({ example: 'Tashkent', description: 'Region' })
  @IsNotEmpty()
  @IsString()
  region: string;

  is_verified: boolean;

  @ApiProperty({ example: 'https://example.com/license-front.jpg', description: 'Driver license front image' })
  @IsNotEmpty()
  @IsString()
  driver_lisence_front: string;

  @ApiProperty({ example: 'https://example.com/license-back.jpg', description: 'Driver license back image' })
  @IsNotEmpty()
  @IsString()
  driver_lisence_back: string;

  @ApiProperty({ example: 'https://example.com/tech-passport-front.jpg', description: 'Technical passport front image' })
  @IsNotEmpty()
  @IsString()
  technical_passport_front: string;

  @ApiProperty({ example: 'https://example.com/tech-passport-back.jpg', description: 'Technical passport back image' })
  @IsNotEmpty()
  @IsString()
  technical_passport_back: string;

  // activation_link : string;
}
