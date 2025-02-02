// src/payments/payment.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany, // Import OneToMany
} from 'typeorm';
import { User } from '../users/user.entity';
import { StripePayment } from './stripe-payment.entity'; // Import StripePayment entity
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @ManyToOne(() => User, (user) => user.payments)
  @JoinColumn({ name: 'user_id' })
  @Field(() => User)
  user: User; // Relationship with user

  @Column('int')
  @Field()
  seatsRented: number; // Number of seats rented

  @Column('float')
  @Field()
  amountPaid: number; // Amount paid for the current month

  @Column()
  @Field()
  paymentDate: Date; // Date of payment

  @Column()
  @Field()
  paymentStatus: string; // Payment status (e.g., 'paid', 'pending')

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  updatedAt: Date;

  // Add this relationship to indicate that a Payment can have multiple StripePayments
  @OneToMany(() => StripePayment, (stripePayment) => stripePayment.payment)
  @Field(() => [StripePayment])
  stripePayments: StripePayment[]; // Array of related StripePayment entities
}
