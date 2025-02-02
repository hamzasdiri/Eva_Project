// users.resolver.ts

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // Get user by ID
  @Query(() => User)
  async user(@Args('id') id: number): Promise<User> {
    return this.usersService.findById(id);
  }

  // Update user details
  @Mutation(() => User)
  async updateUser(
    @Args('id') id: number,
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }
}
