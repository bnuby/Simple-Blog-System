import { InputType, Field, Int } from "@nestjs/graphql";
import { IsString, IsNotEmpty, Length, IsArray, MaxLength } from "class-validator";

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

  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(24, 24)
  user_id: string;

  @Field(() => [String])
  @IsArray()
  keywords: string[];

}