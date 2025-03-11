import { PartialType } from '@nestjs/swagger';
import { CreateTransportTypeDto } from './create-transport_type.dto';

export class UpdateTransportTypeDto extends PartialType(CreateTransportTypeDto) {}
