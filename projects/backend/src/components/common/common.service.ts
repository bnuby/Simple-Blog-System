import { Field } from '@nestjs/graphql';
import {
  Paginated,
  PaginateFilterd,
  PaginateType,
} from '~src/types/paginate.type';
import { Dict } from '~src/types/dict.type';
import { ObjectType, ArgsType } from '@nestjs/graphql';
import { Model, Types } from 'mongoose';

@ArgsType()
@ObjectType()
export class Any {
  @Field()
  any: string;
}

export class PaginatedAny extends Paginated(Any) {}
export class PaginatedAny2 extends Paginated(Any, 'normal') {}

export class AnyPaginatedArgs extends PaginateFilterd(Any) {}

export abstract class CommonService {
  /**
   * Share Paginate
   * @param model
   * @param filter
   * @param query
   * @param extraPipe
   */
  protected async sharePaginate(
    model: Model<any>,
    filter: Dict<any>,
    query: AnyPaginatedArgs,
    extraPipe: Dict<any>[] = [],
  ): Promise<PaginatedAny | PaginatedAny2> {
    let type: PaginateType = 'node';
    /**
     * Data Pipe
     */
    const datasPipe = [];
    if (query.after) {
      // after paginate
      datasPipe.push({
        $match: {
          _id: {
            $gt: new Types.ObjectId(query.after),
          },
        },
      });
    } else if (query.page) {
      // normal paginate
      type = 'normal';
      const skip = (query.page - 1) * query.take; /* per_page */
      datasPipe.push({
        $skip: skip,
      });
    }

    datasPipe.push(...(extraPipe || []), {
      $limit: query.take,
    });

    /**
     * Aggregate Search
     */
    let aggregateResult = await model
      .aggregate([
        {
          $match: filter,
        },
        {
          $facet: {
            count: [
              {
                $group: {
                  _id: null,
                  count: { $sum: 1 },
                },
              },
            ],
            datas: datasPipe,
          },
        },
        {
          $project: {
            count: {
              $first: '$count',
            },
            datas: 1,
          },
        },
      ])
      .exec();

    let result: PaginatedAny | PaginatedAny2;
    switch (type) {
      case 'node':
        // Initial paginated post
        result = {
          edges: [],
          nodes: [],
          currentCursor: query.after,
          totalCount: 0,
          hasNextPage: false,
        };

        if (aggregateResult.length) {
          // Get the aggregate result
          aggregateResult = aggregateResult[0];
          result.edges = aggregateResult.datas.reduce((c, data) => {
            c.push({
              cursor: data._id,
              node: data,
            });
            return c;
          }, []);
          result.nodes = aggregateResult.datas;

          if (aggregateResult.count) {
            result.totalCount = aggregateResult.count.count;
          }
          result.hasNextPage = result.nodes.length != 0;
        }

        break;

      case 'normal':
        // Initial normal paginate post
        result = {
          page: query.page,
          total: 0,
          totalPage: 1,
          data: [],
        };

        if (aggregateResult.length) {
          // Get the aggregate result
          aggregateResult = aggregateResult[0];
          result.data = aggregateResult.datas;

          if (aggregateResult.count) {
            result.total = aggregateResult.count.count;
          }
          result.totalPage = Math.ceil(result.total / query.take);
        }
        break;
    }

    return result;
  }
}
