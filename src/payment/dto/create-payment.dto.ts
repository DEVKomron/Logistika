import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod, PaymentStatus } from '@prisma/client';
import { IsEnum, IsInt, IsPositive } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    example: 1,
    description: 'Foydalanuvchi ID si',
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    example: 'FAILED',
    description: 'Tolov holati (SUCCESS, PENDING, FAILED)',
    enum: PaymentStatus,
  })
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @ApiProperty({
    example: 250000,
    description: 'Tolov miqdori (somda)',
  })
  @IsInt()
  @IsPositive()
  amount: number;

  @ApiProperty({
    example: 3,
    description: 'Buyurtma (Order) ID si',
  })
  @IsInt()
  orderId: number;

  @ApiProperty({
    example: 'CASH',
    description: 'Tolov usuli (CASH, CARD, BANK_TRANSFER)',
    enum: PaymentMethod,
  })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}
