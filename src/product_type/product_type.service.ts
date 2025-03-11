import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductTypeDto } from './dto/create-product_type.dto';
import { UpdateProductTypeDto } from './dto/update-product_type.dto';

@Injectable()
export class ProductTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductTypeDto: CreateProductTypeDto) {
    return await this.prisma.productType.create({
      data: createProductTypeDto,
    });
  }

  async findAll() {
    return await this.prisma.productType.findMany();
  }

  async findOne(id: number) {
    const productType = await this.prisma.productType.findUnique({ where: { id } });
    if (!productType) {
      throw new NotFoundException(`ProductType with ID ${id} not found`);
    }
    return productType;
  }

  async update(id: number, updateProductTypeDto: UpdateProductTypeDto) {
    const productType = await this.prisma.productType.findUnique({ where: { id } });
    if (!productType) {
      throw new NotFoundException(`ProductType with ID ${id} not found`);
    }
    return await this.prisma.productType.update({
      where: { id },
      data: updateProductTypeDto,
    });
  }

  async remove(id: number) {
    const productType = await this.prisma.productType.findUnique({ where: { id } });
    if (!productType) {
      throw new NotFoundException(`ProductType with ID ${id} not found`);
    }
    return await this.prisma.productType.delete({ where: { id } });
  }
}