import { InputType, Field, Int } from "@nestjs/graphql";
import { IsString, IsEmail, IsNumber, Min } from "class-validator";

@InputType()
export class CreateUserInput {

  @Field()
  @IsString()
  first_name: string;

  @Field()
  @IsString()
  last_name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  age: number;

}