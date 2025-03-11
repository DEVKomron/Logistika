import { Injectable } from '@nestjs/common';
import { CreateTransportTypeDto } from './dto/create-transport_type.dto';
import { UpdateTransportTypeDto } from './dto/update-transport_type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransportTypeService {
      constructor(
        private readonly prismaService: PrismaService,
    ) {}
  async create(createTransportTypeDto: CreateTransportTypeDto) {
    return await this.prismaService.transportType.create({
      data: createTransportTypeDto,
    });
  }

  async findAll() {
    return await this.prismaService.transportType.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.transportType.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTransportTypeDto: UpdateTransportTypeDto) {
    return await this.prismaService.transportType.update({
      where: { id },
      data: updateTransportTypeDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.transportType.delete({
      where: { id },
    });
  }
}
