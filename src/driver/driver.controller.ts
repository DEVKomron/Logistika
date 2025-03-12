import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import {  ApiOperation } from '@nestjs/swagger';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi haydovchini ro‘yxatdan o‘tkazish' })
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.create(createDriverDto);
  }

  @Get('activate/:link')
  @ApiOperation({ summary: 'Haydovchi hisobini aktivlashtirish' })
  activated(@Param('link') link: string) {
    return this.driverService.activate(link);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha haydovchilarni olish' })
  findAll() {
    return this.driverService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ma’lum bir haydovchini olish' })
  findOne(@Param('id') id: string) {
    return this.driverService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Haydovchi ma’lumotlarini yangilash' })
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(+id, updateDriverDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Haydovchini o‘chirish' })
  remove(@Param('id') id: string) {
    return this.driverService.remove(+id);
  }
}
