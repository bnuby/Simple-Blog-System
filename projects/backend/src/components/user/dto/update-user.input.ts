import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class UpdateUserInput {

  @Field({ nullable: true })
  first_name: string;

  @Field({ nullable: true })
  last_name: string;

  @Field({ nullable: true })
  password: string;

  @Field(() => Int, { nullable: true})
  age: number;

}