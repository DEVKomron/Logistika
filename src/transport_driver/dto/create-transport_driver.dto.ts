import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length, IsUrl } from 'class-validator';

export class CreateTransportDriverDto {
  @ApiProperty({
    example: 1,
    description: 'Haydovchi ID si',
  })
  @IsInt()
  driverId: number;

  @ApiProperty({
    example: 2,
    description: 'Transport ID si',
  })
  @IsInt()
  transportId: number;

  @ApiProperty({
    example: 'https://example.com/power-of-attorney.pdf',
    description: 'Ishonchnoma (Power of Attorney) fayli URL manzili',
  })
  @IsUrl()
  power_of_attorney: string;
}
