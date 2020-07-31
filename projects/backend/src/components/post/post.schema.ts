import { Document, SchemaTypes } from 'mongoose';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Paginated } from '~src/types/paginate.type';
import { get } from 'lodash';

@ObjectType({ description: 'Users who like the post' })
export class SimpleLikeUser {
  @Field({ description: 'User Id' })
  id: string;
  @Field({ description: 'User First Name' })
  first_name: string;
  @Field({ description: 'User Last Name' })
  last_name: string;
  @Field(() => Int, { description: 'Age of the user' })
  age: number;
  @Field(() => Date, { description: 'Like Date' })
  created_at: Date;
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
    maxlength: 100,
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
    type: SchemaTypes.Number,
    get: function() {
      return get(this, 'like_users.length', 0);
    },
  })
  @Field(() => Int)
  likes: number;

  @Prop({
    type: [SchemaTypes.Mixed],
    default: [],
  })
  @Field(() => [SimpleLikeUser], { nullable: true })
  like_users: SimpleLikeUser[];

  @Prop({
    required: true,
    type: SchemaTypes.String,
  })
  @Field()
  user_id: string;

  @Prop({
    type: SchemaTypes.Array,
    default: [],
  })
  @Field(() => [String], { nullable: true })
  keywords: string[];

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);

@ObjectType()
export class PaginatedPost extends Paginated(Post) {}

@ObjectType()
export class PaginatedPost2 extends Paginated(Post, 'normal') {}
