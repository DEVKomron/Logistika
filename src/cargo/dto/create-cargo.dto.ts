import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { PayerEnum } from '@prisma/client';

export class CreateCargoDto {
  @ApiProperty({ example: 1, description: 'Foydalanuvchi ID si' })
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty({ example: 50.5, description: 'Yukning sof og‘irligi (kg)' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  netWeight: number;

  @ApiProperty({ example: 100, description: 'Yuk hajmi yoki o‘lchami (m³ yoki sm³)' })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  dimensions: number;

  @ApiProperty({ example: 250.75, description: 'Yukning umumiy narxi (so‘m)' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: true, description: 'Yuk qaytib olib kelinishi kerakmi?' })
  @IsNotEmpty()
  @IsBoolean()
  roundTrip: boolean;

  @ApiProperty({ example: false, description: 'Yukni qisman tashish mumkinmi?' })
  @IsNotEmpty()
  @IsBoolean()
  partialPossession: boolean;

  @ApiProperty({ example: 998901234567, description: 'Qabul qiluvchi telefon raqami' })
  @IsNotEmpty()
  receiverPhone: string;

  @ApiProperty({ example: 'SENDER', description: 'Yuk to‘lovini kim amalga oshiradi? (SENDER - jo‘natuvchi, RECEIVER - qabul qiluvchi, SPLIT - bo‘lingan)' })
  @IsNotEmpty()
  @IsEnum(PayerEnum)
  payer: PayerEnum;

  @ApiProperty({ example: 'Mebel yetkazib berish', description: 'Yuk haqida qisqacha ma’lumot' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 200, description: 'Taklif qilingan narx (so‘m)' })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  priceOffer: number;

  @ApiProperty({ example: 2, description: 'Mahsulot turi ID si' })
  @IsNotEmpty()
  @IsInt()
  productTypeId: number;

  @ApiProperty({ example: 'Toshkent, Mirobod tumani', description: 'Yukni olib ketish manzili' })
  @IsNotEmpty()
  @IsString()
  pickupLocation: string;

  @ApiProperty({ example: 'Samarqand, Shahar markazi', description: 'Yuk yetkazib beriladigan manzil' })
  @IsNotEmpty()
  @IsString()
  destinationAddress: string;

  @ApiProperty({ example: true, description: 'Yuk sovutgich talab qiladimi?' })
  @IsNotEmpty()
  @IsBoolean()
  refrigerator: boolean;
}
