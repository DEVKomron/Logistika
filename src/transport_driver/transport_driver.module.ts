import { Module } from '@nestjs/common';
import { TransportDriverService } from './transport_driver.service';
import { TransportDriverController } from './transport_driver.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [TransportDriverController],
  providers: [TransportDriverService],
})
export class TransportDriverModule {}
