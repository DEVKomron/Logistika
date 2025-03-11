import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';

@Injectable()
export class CargoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCargoDto: CreateCargoDto) {
    return await this.prisma.cargo.create({
      data: createCargoDto,
    });
  }

  async findAll() {
    return await this.prisma.cargo.findMany({ include: { User: true } });
  }

  async findOne(id: number) {
    const cargo = await this.prisma.cargo.findUnique({
      where: { id },
    });
    if (!cargo) throw new NotFoundException(`Yuk topilmadi: #${id}`);
    return cargo;
  }

  async update(id: number, updateCargoDto: UpdateCargoDto) {
    const cargo = await this.prisma.cargo.findUnique({ where: { id } });
    if (!cargo) throw new NotFoundException(`Yuk topilmadi: #${id}`);

    return await this.prisma.cargo.update({
      where: { id },
      data: updateCargoDto,
    });
  }

  async remove(id: number) {
    const cargo = await this.prisma.cargo.findUnique({ where: { id } });
    if (!cargo) throw new NotFoundException(`Yuk topilmadi: #${id}`);

    return await this.prisma.cargo.delete({ where: { id } });
  }
}
