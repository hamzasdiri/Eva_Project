import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { StripePayment } from './stripe-payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import Stripe from 'stripe';
import { User } from '../users/user.entity';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(StripePayment)
    private readonly stripePaymentRepository: Repository<StripePayment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new Error(
        'Stripe secret key is not defined in environment variables',
      );
    }

    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2022-08-01' as any,
    });
  }

  async createPayment(
    createPaymentDto: CreatePaymentDto,
    user: User,
  ): Promise<Payment> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: createPaymentDto.amount,
      currency: 'usd',
      metadata: { integration_check: 'accept_a_payment' },
    });
    const payment = new Payment();
    payment.amountPaid = createPaymentDto.amount;
    payment.paymentDate = new Date();
    payment.paymentStatus = paymentIntent.status;
    payment.seatsRented = createPaymentDto.seatsRented;
    payment.user = user;

    const savedPayment = await this.paymentRepository.save(payment);

    const charges = await this.stripe.charges.list({
      payment_intent: paymentIntent.id,
    });

    const chargeId = charges.data.length > 0 ? charges.data[0].id : '';
    const stripePayment = new StripePayment();
    stripePayment.payment = savedPayment;
    stripePayment.stripePaymentIntentId = paymentIntent.id;
    stripePayment.stripePaymentStatus = paymentIntent.status;
    stripePayment.stripeTransactionId = chargeId;

    await this.stripePaymentRepository.save(stripePayment);
    return savedPayment;
  }

  async getUserPayments(userId: number): Promise<Payment[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    return this.paymentRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async findUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    return user;
  }
}
