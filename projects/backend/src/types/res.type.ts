import { ObjectType, Field } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export type ResType<T> = {
  status: boolean;
  code: string;
  msg?: string;
  data?: T;
  err?: any;
};

export function ResTyped<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class ResType {
    @Field()
    status: boolean;

    @Field()
    code: string;

    @Field({ nullable: true })
    msg?: string;

    @Field(() => classRef, { nullable: true })
    data?: T;

    @Field(() => [String], { nullable: true })
    err?: string[];
  }

  return ResType;
}

@ObjectType()
export class ResTypeBoolean extends ResTyped(Boolean) {}

@ObjectType()
export class ResTypeString extends ResTyped(String) {}
