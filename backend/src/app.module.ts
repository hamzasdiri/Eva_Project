import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { ConfigModule } from '@nestjs/config'; // ConfigModule for environment variables
import { ApolloDriver } from '@nestjs/apollo'; // Import ApolloDriver
import { Payment } from './payments/payment.entity'; // Import Payment entity
import { StripePayment } from './payments/stripe-payment.entity'; // Import StripePayment entity

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Automatically loads environment variables
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // Ensure DATABASE_URL is properly set in .env
      entities: [User, Payment, StripePayment], // Add all entities here
      synchronize: process.env.NODE_ENV !== 'production', // Avoid sync in production
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver, // Specify the Apollo driver
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: process.env.NODE_ENV !== 'production', // Enable only in development
      introspection: process.env.NODE_ENV !== 'production', // Enable introspection for dev only
    }),
    UsersModule,
    AuthModule,
    PaymentsModule,
  ],
})
export class AppModule {}
