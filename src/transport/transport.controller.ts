import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import {  ApiOperation } from '@nestjs/swagger';
import { TransportService } from './transport.service';
import { CreateTransportDto } from './dto/create-transport.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';
import { AdminCreatorGuard } from 'src/guards/admin.creator.guard';

@Controller('transport')
export class TransportController {
  constructor(private readonly transportService: TransportService) {}

  @Post()
  @ApiOperation({ summary: 'Transport qo‘shish' })
  create(@Body() createTransportDto: CreateTransportDto) {
    return this.transportService.create(createTransportDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha transportlarni olish' })
  findAll() {
    return this.transportService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta transport ma’lumotini olish' })
  findOne(@Param('id') id: string) {
    return this.transportService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Transport ma’lumotlarini yangilash' })
  update(@Param('id') id: string, @Body() updateTransportDto: UpdateTransportDto) {
    return this.transportService.update(+id, updateTransportDto);
  }

  @Delete(':id')
  @UseGuards(AdminCreatorGuard)
  @ApiOperation({ summary: 'Transportni o‘chirish (faqat admin)' })
  remove(@Param('id') id: string) {
    return this.transportService.remove(+id);
  }
}
