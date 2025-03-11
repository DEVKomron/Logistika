import { Injectable } from '@nestjs/common';
import { CreateTransportDriverDto } from './dto/create-transport_driver.dto';
import { UpdateTransportDriverDto } from './dto/update-transport_driver.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransportDriverService {
    constructor(
      private readonly prismaService: PrismaService,
  ) {}
  async create(createTransportDriverDto: CreateTransportDriverDto) {
    return await this.prismaService.transportDriver.create({
      data: createTransportDriverDto,
    });
  }

  async findAll() {
    return await this.prismaService.transportDriver.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.transportDriver.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTransportDriverDto: UpdateTransportDriverDto) {
    return await this.prismaService.transportDriver.update({
      where: { id },
      data: updateTransportDriverDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.transportDriver.delete({
      where: { id },
    });
  }
}
