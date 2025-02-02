// src/payments/payments.module.ts

import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsResolver } from './payments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { StripePayment } from './stripe-payment.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Payment, StripePayment]),
    UsersModule,
  ],
  providers: [PaymentsService, PaymentsResolver],
})
export class PaymentsModule {}
