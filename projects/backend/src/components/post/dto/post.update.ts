import { InputType, Field } from "@nestjs/graphql";
import { IsArray, MaxLength, IsOptional } from "class-validator";

@InputType()
export class PostUpdate {

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(100)
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  keywords?: string[];

}