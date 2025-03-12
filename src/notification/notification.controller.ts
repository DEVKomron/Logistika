import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { AdminCreatorGuard } from 'src/guards/admin.creator.guard';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @UseGuards(AdminCreatorGuard)
  @ApiOperation({ summary: 'Yangi bildirishnoma yaratish' })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  @UseGuards(AdminCreatorGuard)
  @ApiOperation({ summary: 'Barcha bildirishnomalarni olish' })
  findAll() {
    return this.notificationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta bildirishnomani olish' })
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AdminCreatorGuard)
  @ApiOperation({ summary: 'Bildirishnomani yangilash' })
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationService.update(+id, updateNotificationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Bildirishnomani o‘chirish' })
  remove(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }
}
