import { QuerySelector } from 'mongodb';

export type Operations =
  | '$eq'
  | '$gt'
  | '$gte'
  | '$lt'
  | '$lte'
  | '$in'
  | '$nin'
  | '$ne'
  | '$not'
  | '$exists'
  | '$type'
  | '$expr';

export class QueryHelper {
  static mapFilterLike(
    to: { [key: string]: any },
    from: { [key: string]: any },
    keys: string[] = [],
  ): void {
    for (const key of keys) {
      if (from[key] != null) {
        to[key] = {
          $regex: new RegExp(`^${from[key]}.*`),
        };
      }
    }
  }

  static mapFilterOperation(
    operation: Operations,
    to: { [key: string]: any },
    from: { [key: string]: any },
    keys: string[] = [],
  ): void {
    for (const key of keys) {
      if (from[key] != null) {
        to[key] = {
          [operation]: from[key],
        };
      }
    }
  }

  static mapFilterEq(
    to: { [key: string]: any },
    from: { [key: string]: any },
    keys: string[] = [],
  ): void {
    this.mapFilterOperation('$eq', to, from, keys);
  }
}
