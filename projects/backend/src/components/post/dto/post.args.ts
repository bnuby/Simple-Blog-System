import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Min, IsString, IsInt } from 'class-validator';

@ArgsType()
export class PostArgs {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  @Min(0)
  likeGte? = 0;

  @Field({ nullable: true })
  keywords?: string;

  @Field({ nullable: true })
  user_id?: string;
}
