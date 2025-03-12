import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { AdminCreatorGuard } from 'src/guards/admin.creator.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @ApiOperation({ summary: 'Yangi foydalanuvchi yaratish' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AdminCreatorGuard) 
  @ApiOperation({ summary: 'Barcha foydalanuvchilarni olish   Faqat adminlar foydalanuvchini ochirishi mumkin' })
  findAll() {
    return this.userService.findAll();
  }
  @Get('activate/:link')
  @ApiOperation({ summary: 'User hisobini aktivlashtirish' })
  activated(@Param('link') link: string) {
    return this.userService.activate(link);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta foydalanuvchini olish' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Foydalanuvchi malumotlarini yangilash' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AdminCreatorGuard) 
  @ApiOperation({ summary: 'Foydalanuvchini ochirish  Faqat adminlar foydalanuvchini ochirishi mumkin' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
