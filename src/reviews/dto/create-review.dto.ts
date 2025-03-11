import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    example: 1,
    description: 'Foydalanuvchi ID si',
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    example: 2,
    description: 'Haydovchi ID si',
  })
  @IsInt()
  driverId: number;

  @ApiProperty({
    example: 'Haydovchi juda yaxshi xizmat ko‘rsatdi!',
    description: 'Foydalanuvchi tomonidan qoldirilgan sharh matni',
  })
  @IsString()
  @Length(3, 500)
  text: string;
}
