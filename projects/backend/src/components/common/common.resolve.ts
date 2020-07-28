import { GraphqlExceptionFilter } from './../../filters/graphql-exception.filter';
import { UseFilters } from "@nestjs/common";

@UseFilters(GraphqlExceptionFilter)
export abstract class CommonResolve {
}