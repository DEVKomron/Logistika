import { Module } from '@nestjs/common';
import { RaitingService } from './raiting.service';
import { RaitingController } from './raiting.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [RaitingController],
  providers: [RaitingService],
})
export class RaitingModule {}
