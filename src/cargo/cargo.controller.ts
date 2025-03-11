import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CargoService } from './cargo.service';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { AdminCreatorGuard } from 'src/guards/admin.creator.guard';

@Controller('cargo')
export class CargoController {
  constructor(private readonly cargoService: CargoService) {}

  @Post()
  create(@Body() createCargoDto: CreateCargoDto) {
    return this.cargoService.create(createCargoDto);
  }

  @Get()
  @UseGuards(AdminCreatorGuard)
  findAll() {
    return this.cargoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cargoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCargoDto: UpdateCargoDto) {
    return this.cargoService.update(+id, updateCargoDto);
  }

  @Delete(':id')
  @UseGuards(AdminCreatorGuard)
  remove(@Param('id') id: string) {
    return this.cargoService.remove(+id);
  }
}
