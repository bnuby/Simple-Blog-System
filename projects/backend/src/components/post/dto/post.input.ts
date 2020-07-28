import { InputType, Field, Int } from "@nestjs/graphql";
import { IsString, IsNotEmpty, Length } from "class-validator";

@InputType()
export class PostInput {

  @Field()
  @IsString()
  @IsNotEmpty()
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

}