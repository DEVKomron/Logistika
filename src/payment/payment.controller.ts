import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { AdminCreatorGuard } from 'src/guards/admin.creator.guard';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi tolov yaratish' })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @UseGuards(AdminCreatorGuard)
  @ApiOperation({ summary: 'Barcha tolovlarni olish' })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta tolovni olish' })
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AdminCreatorGuard)
  @ApiOperation({ summary: 'Tolovni yangilash' })
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  @UseGuards(AdminCreatorGuard)
  @ApiOperation({ summary: 'Tolovni ochirish' })
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
