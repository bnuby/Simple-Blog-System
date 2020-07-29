import { ObjectType, Field } from "@nestjs/graphql";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from 'mongoose';
import { hashSync } from 'bcrypt';
import { Paginated } from "~src/types/paginate.type";

@ObjectType()
@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class User extends Document {

  @Field()
  id: string;

  @Prop({
    type: String,
    get: function () {
      return `${this.first_name} ${this.last_name}`;
    },
  })
  @Field({ nullable: true })
  full_name: string

  @Prop({
    required: true,
    type: SchemaTypes.String,
  })
  @Field({ nullable: true })
  first_name: string;

  @Prop({
    required: true,
    type: SchemaTypes.String,
  })
  @Field({ nullable: true })
  last_name: string;

  @Prop({
    required: true,
    unique: true,
    type: SchemaTypes.String,
  })
  @Field()
  email: string;

  @Prop({
    required: true,
    type: SchemaTypes.String,
    select: false,
    set: (value) => {
      return hashSync(value, 10);
    }
  })
  password: string;

  @Prop({
    required: true,
    type: SchemaTypes.Number,
  })
  @Field()
  age: number;

  @Prop({
    type: SchemaTypes.String,
    select: false,
  })
  token: string;

  @Prop({
    type: SchemaTypes.Date,
  })
  @Field()
  last_login_date: Date;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);

@ObjectType()
export class PaginatedUser extends Paginated(User) { }

@ObjectType()
export class PaginatedUser2 extends Paginated(User, 'normal') { }