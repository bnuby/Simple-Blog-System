import { Field, Int, ArgsType } from "@nestjs/graphql";
import { Min } from "class-validator";

@ArgsType()
export class FindUserDTO {

  @Field(() => String, { nullable: true })
  first_name: string;

  @Field(() => String, { nullable: true })
  last_name: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => Int, { nullable: true })
  @Min(0)
  ageGte = 0;

}