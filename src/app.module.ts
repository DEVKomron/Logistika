import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DriverModule } from './driver/driver.module';
import { CargoModule } from './cargo/cargo.module';
import { ProductTypeModule } from './product_type/product_type.module';
import { NotificationModule } from './notification/notification.module';
import { TransportDriverModule } from './transport_driver/transport_driver.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrdersModule } from './orders/orders.module';
import { RaitingModule } from './raiting/raiting.module';
import { PaymentModule } from './payment/payment.module';
import { TransportTypeModule } from './transport_type/transport_type.module';
import { TransportModule } from './transport/transport.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    UserModule,
    AuthModule,
    DriverModule,
    CargoModule,
    ProductTypeModule,
    NotificationModule,
    TransportDriverModule,
    ReviewsModule,
    OrdersModule,
    RaitingModule,
    PaymentModule,
    TransportTypeModule,
    TransportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
