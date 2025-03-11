import { Module } from '@nestjs/common';
import { TransportTypeService } from './transport_type.service';
import { TransportTypeController } from './transport_type.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [TransportTypeController],
  providers: [TransportTypeService],
})
export class TransportTypeModule {}
