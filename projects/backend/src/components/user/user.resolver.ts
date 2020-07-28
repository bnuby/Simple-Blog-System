import { ResTypeBoolean, ResTypeString } from './../../types/res.type';
import { ResType, ResTyped } from '~types/res.type';
import { Resolver, Query, Args, ResolveField, Parent, Mutation } from "@nestjs/graphql";
import { User, PaginatedUser, PaginatedUser2 } from "~src/components/user/user.schema";
import { UserService } from "~src/components/user/user.service";
import { UsersArgs } from "~src/components/user/dto/users.args";
import { FindUserDTO } from "~src/components/user/dto/find-user.dto";
import { PostService } from "~src/components/post/post.service";
import { PaginatedPost } from "~src/components/post/post.schema";
import { PostsPaginateArgs } from "~src/components/post/dto/post-paginate.args";
import { CreateUserInput } from "~src/components/user/dto/create-user.input";
import { UpdateUserInput } from "~src/components/user/dto/update-user.input";
import { UserPaginateArgs } from '~src/components/user/dto/user-paginate.args';
import { CommonResolve } from '~components/common/common.resolve';
import { UseGuards, UseFilters } from '@nestjs/common';
import { AuthGuard } from '~guards/auth.guard';
import { GraphqlExceptionFilter } from '~filters/graphql-exception.filter';

@Resolver(() => User)
@UseGuards(AuthGuard)
@UseFilters(new GraphqlExceptionFilter())
export class UserResolver extends CommonResolve {

  constructor(
    private readonly service: UserService,
    private readonly postService: PostService
  ) {
    super();
  }

  @Query(() => User, { nullable: true, description: "Retrieve Single User Detail" })
  async user(@Args() filter: FindUserDTO): Promise<User> {
    return await this.service.findOne(filter);
  }

  @Query(() => PaginatedUser2, { description: "Retrieve Multiple User Data" })
  async users(@Args() filter: UsersArgs): Promise<PaginatedUser2> {
    return await this.service.find(filter);
  }

  @Query(() => PaginatedUser)
  async userPaginate(@Args() filter: UserPaginateArgs): Promise<PaginatedUser> {
    const userPaginate = await this.service.paginate(filter);
    userPaginate
    return userPaginate;
  }

  @ResolveField(() => PaginatedPost)
  async posts(@Parent() user: User, @Args() filter: PostsPaginateArgs): Promise<PaginatedPost> {
    const { id } = user;
    filter.user_id = id;
    return await this.postService.paginate(filter);
  }

  @Mutation(() => ResTypeBoolean)
  async createUser(@Args("create") create: CreateUserInput): Promise<ResType<boolean>> {

    const ok = await this.service.create(create);

    return {
      status: ok,
      code: ok ? "S_002" /* Success */ : "F_002" /* Fail */,
    };
  }

  @Mutation(() => ResTypeBoolean)
  async updateUser(@Args("user_id") user_id: string, @Args("update") update: UpdateUserInput): Promise<ResType<boolean>> {
    const ok = await this.service.update(user_id, update);

    return {
      status: ok,
      code: ok ? "S_003" /* Success */ : "F_003" /* Fail */
    };
  }

  @Mutation(() => ResTypeBoolean)
  async deleteUser(@Args("user_id") user_id: string): Promise<ResType<boolean>> {

    let ok = false;

    if (user_id.length == 24) {
      ok = await this.service.delete(user_id);
    }
    
    return {
      status: ok,
      code: ok ? "S_004" /* Success */ : "F_004" /* Fail */
    }
  }

}