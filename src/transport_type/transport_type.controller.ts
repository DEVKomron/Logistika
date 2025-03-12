import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TransportTypeService } from './transport_type.service';
import { CreateTransportTypeDto } from './dto/create-transport_type.dto';
import { UpdateTransportTypeDto } from './dto/update-transport_type.dto';

@ApiTags('Transport Type') // Swagger uchun bo‘lim nomi
@Controller('transport-type')
export class TransportTypeController {
  constructor(private readonly transportTypeService: TransportTypeService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi transport turini qo‘shish' })
  create(@Body() createTransportTypeDto: CreateTransportTypeDto) {
    return this.transportTypeService.create(createTransportTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha transport turlarini olish' })
  findAll() {
    return this.transportTypeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta transport turini olish' })
  findOne(@Param('id') id: string) {
    return this.transportTypeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Transport turi ma’lumotlarini yangilash' })
  update(@Param('id') id: string, @Body() updateTransportTypeDto: UpdateTransportTypeDto) {
    return this.transportTypeService.update(+id, updateTransportTypeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Transport turini o‘chirish' })
  remove(@Param('id') id: string) {
    return this.transportTypeService.remove(+id);
  }
}
