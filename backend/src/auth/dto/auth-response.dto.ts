// src/auth/dto/auth-response.dto.ts
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse {
  @Field()
  accessToken: string;

  @Field()
  userId: number;
}
