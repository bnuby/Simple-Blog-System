import { ObjectType, Field, Int, ArgsType, InterfaceType } from "@nestjs/graphql";
import { Min, Max } from "class-validator";
import { Type } from "@nestjs/common";

export type PaginateType = "node" | "normal";

export function Paginated<T>(classRef: Type<T>, type: PaginateType = "node"): any {

  if (type == 'normal') {

    @ObjectType({
      isAbstract: true
    })
    abstract class Paginate {
      @Field(() => Int)
      total: number;

      @Field(() => Int)
      page: number;

      @Field(() => Int)
      totalPage: number;

      @Field(() => [classRef])
      data: T[]
    }

    return Paginate;
  }


  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {

    @Field(() => String)
    cursor: string;

    @Field(() => classRef)
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [EdgeType], { nullable: true })
    edges: EdgeType[]

    @Field(() => [classRef], { nullable: true })
    nodes: T[]

    @Field(() => Int)
    totalCount: number;

    @Field({ nullable: true })
    currentCursor: string;

    @Field()
    hasNextPage: boolean;
  }

  return PaginatedType;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Base { }
interface BaseClass<T> {
  new(): T
}

export function PaginateFilterd<T extends Base>(classRef: BaseClass<T>, type: PaginateType = 'node'): any {

  if (type == 'normal') {
    @ArgsType()
    abstract class PaginateFilter2 extends (classRef as BaseClass<Base>) {

      @Field(() => Int, { })
      @Min(1)
      page = 1;
      @Field(() => Int, { nullable: true })
      @Min(1)
      take = 10

    }
    return PaginateFilter2;
  }

  @ArgsType()
  abstract class PaginateFilter extends (classRef as BaseClass<Base>) {
    @Field({ nullable: true })
    after?: string;

    @Field(() => Int, {})
    @Min(1)
    @Max(30)
    take = 10;
  }

  return PaginateFilter;
}
