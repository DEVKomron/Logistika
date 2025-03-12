import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ProductTypeService } from './product_type.service';
import { CreateProductTypeDto } from './dto/create-product_type.dto';
import { UpdateProductTypeDto } from './dto/update-product_type.dto';


@Controller('product-type')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi mahsulot turini yaratish' })
  create(@Body() createProductTypeDto: CreateProductTypeDto) {
    return this.productTypeService.create(createProductTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha mahsulot turlarini olish' })
  findAll() {
    return this.productTypeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta mahsulot turini olish' })
  findOne(@Param('id') id: string) {
    return this.productTypeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mahsulot turini yangilash' })
  update(@Param('id') id: string, @Body() updateProductTypeDto: UpdateProductTypeDto) {
    return this.productTypeService.update(+id, updateProductTypeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Mahsulot turini ochirish' })
  remove(@Param('id') id: string) {
    return this.productTypeService.remove(+id);
  }
}
