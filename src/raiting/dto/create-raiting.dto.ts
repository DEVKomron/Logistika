import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, Min, Max } from 'class-validator';

export class CreateRaitingDto {
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
    example: 4.5,
    description: 'Haydovchiga berilgan baho (1 dan 5 gacha)',
  })
  @IsPositive()
  @Min(1)
  @Max(5)
  score: number;
}
