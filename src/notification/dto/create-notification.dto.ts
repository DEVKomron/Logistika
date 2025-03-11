import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({
    example: false,
    description: 'Bildirishnoma oqilgan yoki yoqligi',
    default: false,
  })
  @IsBoolean()
  isRead?: boolean;

  @ApiProperty({
    example: 1,
    description: 'Haydovchining ID si',
  })
  @IsInt()
  driverId: number;

  @ApiProperty({
    example: 2,
    description: 'Yukning ID si',
  })
  @IsInt()
  cargoId: number;
}
