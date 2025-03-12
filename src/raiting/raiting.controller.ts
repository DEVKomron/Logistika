import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RaitingService } from './raiting.service';
import { CreateRaitingDto } from './dto/create-raiting.dto';
import { UpdateRaitingDto } from './dto/update-raiting.dto';

@Controller('raiting')
export class RaitingController {
  constructor(private readonly raitingService: RaitingService) {}

  @Post()
  @ApiOperation({ summary: 'Foydalanuvchi reytingini yaratish' })
  create(@Body() createRaitingDto: CreateRaitingDto) {
    return this.raitingService.create(createRaitingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha reytinglarni olish' })
  findAll() {
    return this.raitingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta reytingni olish' })
  findOne(@Param('id') id: string) {
    return this.raitingService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Reytingni yangilash' })
  update(@Param('id') id: string, @Body() updateRaitingDto: UpdateRaitingDto) {
    return this.raitingService.update(+id, updateRaitingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Reytingni o‘chirish' })
  remove(@Param('id') id: string) {
    return this.raitingService.remove(+id);
  }
}
