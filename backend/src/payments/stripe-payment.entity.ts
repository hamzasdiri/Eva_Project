// src/payments/stripe-payment.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Payment } from './payment.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class StripePayment {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @ManyToOne(() => Payment, (payment) => payment.stripePayments)
  @JoinColumn({ name: 'payment_id' })
  @Field(() => Payment)
  payment: Payment; // Relationship with payment

  @Column()
  @Field()
  stripePaymentIntentId: string; // Stripe Payment Intent ID

  @Column()
  @Field()
  stripePaymentStatus: string; // Status from Stripe (e.g., 'succeeded', 'failed')

  @Column()
  @Field()
  stripeTransactionId: string; // Stripe Transaction ID

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  updatedAt: Date;
}
