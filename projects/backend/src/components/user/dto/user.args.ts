import { Field, Int, ArgsType } from "@nestjs/graphql";
import { Min } from "class-validator";

@ArgsType()
export class UserArgs {

  @Field(() => String, { nullable: true })
  first_name?: string;

  @Field(() => String, { nullable: true })
  last_name?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => Int)
  @Min(0)
  ageGte = 0;

}