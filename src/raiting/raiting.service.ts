import { Injectable } from '@nestjs/common';
import { CreateRaitingDto } from './dto/create-raiting.dto';
import { UpdateRaitingDto } from './dto/update-raiting.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RaitingService {
    constructor(
      private readonly prismaService: PrismaService,
  ) {}
  async create(createRaitingDto: CreateRaitingDto) {
    return await this.prismaService.rating.create({ data: createRaitingDto });
  }

  async findAll() {
    return await this.prismaService.rating.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.rating.findUnique({ where: { id } });
  }

  async update(id: number, updateRaitingDto: UpdateRaitingDto) {
    return await this.prismaService.rating.update({
      where: { id },
      data: updateRaitingDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.rating.delete({ where: { id } });
  }
}
