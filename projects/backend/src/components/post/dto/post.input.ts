import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsArray, MaxLength } from 'class-validator';

@InputType()
export class PostInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  user_id: string;

  @Field(() => [String])
  @IsArray()
  keywords: string[];
}
