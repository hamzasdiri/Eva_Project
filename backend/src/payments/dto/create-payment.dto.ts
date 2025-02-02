// src/payments/dto/create-payment.dto.ts

import { InputType, Field } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';

@InputType()
export class CreatePaymentDto {
  @Field()
  @IsInt()
  @Min(1)
  amount: number;

  @Field()
  @IsInt()
  @Min(1)
  seatsRented: number;
}
