import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CargoService } from './cargo.service';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { AdminCreatorGuard } from 'src/guards/admin.creator.guard';

@ApiTags('Cargo')
@Controller('cargo')
export class CargoController {
  constructor(private readonly cargoService: CargoService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi yukni royxatdan otkazish' })
  create(@Body() createCargoDto: CreateCargoDto) {
    return this.cargoService.create(createCargoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha yuklarni olish' })
  findAll() {
    return this.cargoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Malum bir yukni olish' })
  findOne(@Param('id') id: string) {
    return this.cargoService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AdminCreatorGuard)
  @ApiOperation({ summary: 'Yuk malumotlarini yangilash' })
  update(@Param('id') id: string, @Body() updateCargoDto: UpdateCargoDto) {
    return this.cargoService.update(+id, updateCargoDto);
  }

  @Delete(':id')
  @UseGuards(AdminCreatorGuard)
  @ApiOperation({ summary: 'Yukni ochirish' })
  remove(@Param('id') id: string) {
    return this.cargoService.remove(+id);
  }
}
