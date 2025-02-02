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
  user: User;

  @Column('int')
  @Field()
  seatsRented: number;

  @Column('float')
  @Field()
  amountPaid: number;

  @Column()
  @Field()
  paymentDate: Date;

  @Column()
  @Field()
  paymentStatus: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  updatedAt: Date;

  @OneToMany(() => StripePayment, (stripePayment) => stripePayment.payment)
  @Field(() => [StripePayment])
  stripePayments: StripePayment[];
}
