import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransportTypeService } from './transport_type.service';
import { CreateTransportTypeDto } from './dto/create-transport_type.dto';
import { UpdateTransportTypeDto } from './dto/update-transport_type.dto';

@Controller('transport-type')
export class TransportTypeController {
  constructor(private readonly transportTypeService: TransportTypeService) {}

  @Post()
  create(@Body() createTransportTypeDto: CreateTransportTypeDto) {
    return this.transportTypeService.create(createTransportTypeDto);
  }

  @Get()
  findAll() {
    return this.transportTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transportTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransportTypeDto: UpdateTransportTypeDto) {
    return this.transportTypeService.update(+id, updateTransportTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transportTypeService.remove(+id);
  }
}
