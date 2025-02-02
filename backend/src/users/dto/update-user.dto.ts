// update-user.dto.ts

import { InputType, Field } from '@nestjs/graphql';
import {
  IsOptional,
  IsEmail,
  IsString,
  MinLength,
  IsInt,
  Min,
} from 'class-validator';

@InputType()
export class UpdateUserDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  seatsPaid?: number;
}
