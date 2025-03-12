import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import {  ApiOperation } from '@nestjs/swagger';
import { TransportDriverService } from './transport_driver.service';
import { CreateTransportDriverDto } from './dto/create-transport_driver.dto';
import { UpdateTransportDriverDto } from './dto/update-transport_driver.dto';
import { AdminCreatorGuard } from 'src/guards/admin.creator.guard';

@Controller('transport-driver')
export class TransportDriverController {
  constructor(private readonly transportDriverService: TransportDriverService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi transport haydovchisini qo‘shish' })
  create(@Body() createTransportDriverDto: CreateTransportDriverDto) {
    return this.transportDriverService.create(createTransportDriverDto);
  }

  @Get()
  @UseGuards(AdminCreatorGuard)
  @ApiOperation({ summary: 'Barcha transport haydovchilarini olish (Admin)' })
  findAll() {
    return this.transportDriverService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta transport haydovchisini olish' })
  findOne(@Param('id') id: string) {
    return this.transportDriverService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Transport haydovchisi ma’lumotlarini yangilash' })
  update(@Param('id') id: string, @Body() updateTransportDriverDto: UpdateTransportDriverDto) {
    return this.transportDriverService.update(+id, updateTransportDriverDto);
  }

  @Delete(':id')
  @UseGuards(AdminCreatorGuard)
  @ApiOperation({ summary: 'Transport haydovchisini o‘chirish (Admin)' })
  remove(@Param('id') id: string) {
    return this.transportDriverService.remove(+id);
  }
}
