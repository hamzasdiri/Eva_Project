// src/payments/dto/create-payment.dto.ts

import { InputType, Field } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';

@InputType()
export class CreatePaymentDto {
  @Field()
  @IsInt()
  @Min(1)
  amount: number; // Amount to charge in cents (e.g., 1000 for $10)

  @Field()
  @IsInt()
  @Min(1)
  seatsRented: number; // Number of seats rented
}
