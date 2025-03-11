import { PartialType } from '@nestjs/swagger';
import { CreateTransportDriverDto } from './create-transport_driver.dto';

export class UpdateTransportDriverDto extends PartialType(CreateTransportDriverDto) {}
