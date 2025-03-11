import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
    constructor(
      private readonly prismaService: PrismaService,
  ) {}
  create(createNotificationDto: CreateNotificationDto) {
    return this.prismaService.notification.create({ data: createNotificationDto });
  }

  findAll() {
    return this.prismaService.notification.findMany();
  }

  findOne(id: number) {
    return this.prismaService.notification.findUnique({ where: { id } });
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return this.prismaService.notification.update({
      where: { id },
      data: updateNotificationDto,
    });
  }

  remove(id: number) {
    return this.prismaService.notification.delete({ where: { id } });
  }
}
