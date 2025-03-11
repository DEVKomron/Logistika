import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    example: 1,
    description: 'Foydalanuvchi ID si',
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    example: 2,
    description: 'Yuk (Cargo) ID si',
  })
  @IsInt()
  cargoId: number;

  @ApiProperty({
    example: 500000,
    description: 'Buyurtma narxi (somda)',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: true,
    description: 'Buyurtma faol yoki yoqligi',
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    example: 3,
    description: 'Transport ID si',
  })
  @IsInt()
  transportId: number;

  @ApiProperty({
    example: 4,
    description: 'Haydovchi (Driver) ID si',
  })
  @IsInt()
  driverId: number;
}
