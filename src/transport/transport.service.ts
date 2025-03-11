import { Injectable } from '@nestjs/common';
import { CreateTransportDto } from './dto/create-transport.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransportService {
    constructor(
      private readonly prismaService: PrismaService,
  ) {}
  
  create(createTransportDto: CreateTransportDto) {
    return this.prismaService.transport.create({ data: createTransportDto });
  }

  findAll() {
    return this.prismaService.transport.findMany({include:{TransportType:true, transportDriver:true}});
  }

  findOne(id: number) {
    return this.prismaService.transport.findUnique({ where: { id } });
  }

  update(id: number, updateTransportDto: UpdateTransportDto) {
    return this.prismaService.transport.update({
      where: { id },
      data: updateTransportDto,
    });
  }

  remove(id: number) {
    return this.prismaService.transport.delete({ where: { id } });
  }
}
