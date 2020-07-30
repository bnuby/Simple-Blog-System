import { Resolver, Args, Query, Mutation, Parent, ResolveField, Subscription, CONTEXT } from "@nestjs/graphql";
import { PostService } from "~src/components/post/post.service";
import { PostArgs } from "~src/components/post/dto/post.args";
import { PostsArgs } from "~src/components/post/dto/posts.args";
import { Post, PaginatedPost, PaginatedPost2 } from "~src/components/post/post.schema";
import { PostsPaginateArgs } from "~src/components/post/dto/post-paginate.args";
import { PostInput } from "~src/components/post/dto/post.input";
import { UserService } from "~src/components/user/user.service";
import { User } from "~src/components/user/user.schema";
import { PubSub } from 'graphql-subscriptions';
import { ResType, ResTypeBoolean } from "~src/types/res.type";
import { CommonResolve } from "~components/common/common.resolve";
import { UseFilters, UseGuards, Inject } from "@nestjs/common";
import { GraphqlExceptionFilter } from "~filters/graphql-exception.filter";
import { AuthGuard } from '~guards/auth.guard';
import { IgnoreGuard } from '~decorators/ignore-guard';
import { PostUpdate } from '~components/post/dto/post.update';
import { ResTypePost } from '~components/user/model/post-res-type';

const pubSub = new PubSub();

@Resolver(() => Post)
@UseGuards(AuthGuard)
@UseFilters(new GraphqlExceptionFilter())
export class PostResolver extends CommonResolve {

  constructor(
    @Inject(CONTEXT) private readonly context: any,
    private readonly service: PostService,
    private readonly userService: UserService,
  ) {
    super();
  }

  @IgnoreGuard()
  @Query(() => Post, { nullable: true, description: "Retrieve Single Post Data" })
  async post(@Args() filter: PostArgs): Promise<Post> {
    return await this.service.findOne(filter);
  }

  @IgnoreGuard()
  @Query(() => PaginatedPost2, { description: "Retrieve Multiple Post Data" })
  async posts(@Args() filter: PostsArgs): Promise<PaginatedPost2> {
    return await this.service.find(filter) as any;
  }

  @IgnoreGuard()
  @Query(() => PaginatedPost, { description: "Retrieve Multiple Post Data" })
  async postsPaginate(@Args() filter: PostsPaginateArgs): Promise<PaginatedPost> {
    return await this.service.paginate(filter);
  }

  @ResolveField(() => User)
  async user(@Parent() post: Post): Promise<User> {
    const { user_id } = post;
    return this.userService.findOneById(user_id);
  }

  @Mutation(() => ResTypePost, { nullable: true })
  async createPost(
    @Args('create') create: PostInput,
  ): Promise<ResType<Post>> {

    const { user } = this.context;

    create.user_id = user.id;

    const post = await this.service.create(create);

    if (!post) {
      // Fail to Create Post
      return {
        status: false,
        code: "F_012",
      };
    }

    pubSub.publish('postAdded', { postAdded: post });

    // Success
    return {
      status: true,
      code: "S_012",
      data: post,
    };
  }

  @Mutation(() => ResTypePost, { nullable: true })
  async updatePost(
    @Args('post_id') post_id: string,
    @Args('update') update: PostUpdate,
  ): Promise<ResType<Post | boolean>> {

    const { user } = this.context;

    update.user_id = user.id;

    const failRes = {
      status: false,
      code: "F_013",
    };

    if (post_id.length != 24) {
      return failRes;
    }

    const post = await this.service.update(post_id, update)

    if (!post) {
      // Fail to update post.
      return failRes;
    }

    // notify post updated
    pubSub.publish('postUpdated', { postUpdated: post });

    // Success  
    return {
      status: true,
      code: "S_013",
      data: post,
    }
  }

  @Mutation(() => ResTypePost)
  async deletePost(
    @Args("post_id")
    post_id: string
  ): Promise<ResType<Post | boolean>> {

    const { user } = this.context;

    const failRes = {
      status: false,
      code: "F_014",
    };

    if (post_id.length != 24) {
      return failRes;
    }

    let post: Post | boolean = false;

    // Validate Post Length
    post = await this.service.delete(post_id, user.id);

    if (!post) {
      return failRes;
    }
    pubSub.publish('postDeleted', { postDeleted: post });

    return {
      status: true,
      code: "S_014",
      data: post as Post
    };
  }

  @Mutation(() => ResTypeBoolean)
  async likePost(
    @Args("post_id")
    post_id: string
  ): Promise<ResType<boolean>> {
    const { user } = this.context;

    if (post_id.length != 24) {
      return {
        status: false,
        code: "F_015"
      }
    }

    const ok = await this.service.likePost(user, post_id);

    return {
      status: ok,
      code: ok ? "S_015" : "F_015",
    };
  }

  @Mutation(() => ResTypeBoolean)
  async unlikePost(
    @Args("post_id")
    post_id: string
  ): Promise<ResType<boolean>> {
    const { user } = this.context;

    if (post_id.length != 24) {
      return {
        status: false,
        code: "F_016"
      }
    }

    const ok = await this.service.unlikePost(user, post_id);

    return {
      status: ok,
      code: ok ? "S_016" : "F_016",
    }
  }

  @IgnoreGuard()
  @Subscription(() => Post)
  async postAdded(): Promise<AsyncIterator<Post>> {
    return pubSub.asyncIterator<Post>('postAdded');
  }

  @IgnoreGuard()
  @Subscription(() => Post)
  async postDeleted(): Promise<AsyncIterator<Post>> {
    return pubSub.asyncIterator('postDeleted');
  }

  @IgnoreGuard()
  @Subscription(() => Post)
  async postUpdated(): Promise<AsyncIterator<Post>> {
    return pubSub.asyncIterator('postUpdated');
  }

}