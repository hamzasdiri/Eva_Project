// common/database/database.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../payments/payment.entity';
import { User } from '../users/user.entity';
import { StripePayment } from '../payments/stripe-payment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Payment, User, StripePayment], // Add all entities here
      synchronize: true, // Set to false in production for safety
    }),
    TypeOrmModule.forFeature([Payment, User, StripePayment]), // Register the entities for injection
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
