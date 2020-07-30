/**
 * Convert Obj to GraphQL Query
 * @param query
 */
export const convertObjToQuery = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: { [key: string]: string } | any
): string => {
  const arr = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(query)) {
    if (value != null) {
      arr.push(`${key}: ${JSON.stringify(value)}`);
    }
  }

  return arr.join("\n");
};

export interface Paginate {
  page?: number;
  take?: number;
}

export interface NodePaginate {
  after?: string;
  take?: number;
}
