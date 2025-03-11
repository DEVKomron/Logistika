import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TransportDriverService } from './transport_driver.service';
import { CreateTransportDriverDto } from './dto/create-transport_driver.dto';
import { UpdateTransportDriverDto } from './dto/update-transport_driver.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('transport-driver')
export class TransportDriverController {
  constructor(private readonly transportDriverService: TransportDriverService) {}

  @Post()
  create(@Body() createTransportDriverDto: CreateTransportDriverDto) {
    return this.transportDriverService.create(createTransportDriverDto);
  }

  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.transportDriverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transportDriverService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransportDriverDto: UpdateTransportDriverDto) {
    return this.transportDriverService.update(+id, updateTransportDriverDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.transportDriverService.remove(+id);
  }
}
