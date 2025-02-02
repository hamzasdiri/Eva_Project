// src/payments/payments.resolver.ts

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PaymentsService } from './payments.service';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Resolver(() => Payment)
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Mutation(() => Payment)
  async createPayment(
    @Args('createPaymentDto') createPaymentDto: CreatePaymentDto,
    @Args('userId') userId: number,
  ): Promise<Payment> {
    const user = await this.paymentsService.findUserById(userId);
    return this.paymentsService.createPayment(createPaymentDto, user);
  }

  @Query(() => [Payment])
  async getUserPayments(
    @Args('userId') userId: number, // Accept the userId as an argument
  ): Promise<Payment[]> {
    return this.paymentsService.getUserPayments(userId);
  }
}
