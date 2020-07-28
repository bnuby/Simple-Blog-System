import { Document, SchemaTypes } from "mongoose";
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Paginated } from "~src/types/paginate.type";

@ObjectType()
export class SimpleLikeUser {
  @Field()
  id: string;
  @Field()
  first_name: string;
  @Field()
  last_name: string;
  @Field(() => Int)
  age: number;
  @Field(() => Date)
  create_at: Date;
}

@ObjectType()
@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Post extends Document {

  @Field()
  id: string;

  @Prop({
    required: true,
    type: SchemaTypes.String,
  })
  @Field()
  title: string;

  @Prop({
    required: true,
    type: SchemaTypes.String,
  })
  @Field()
  description: string;

  @Prop({
    required: true,
    type: SchemaTypes.Number,
    default: 0,
  })
  @Field(() => Int)
  likes: number;

  @Prop({
    type: [SchemaTypes.Mixed]
  })
  @Field(() => [SimpleLikeUser])
  like_users: SimpleLikeUser[];

  @Prop({
    required: true,
    type: SchemaTypes.String,
  })
  @Field()
  user_id: string

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

}

export const PostSchema = SchemaFactory.createForClass(Post);


@ObjectType()
export class PaginatedPost extends Paginated(Post) { }

@ObjectType()
export class PaginatedPost2 extends Paginated(Post, 'normal') { }