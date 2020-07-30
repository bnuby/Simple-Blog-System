/* eslint-disable no-restricted-syntax */
export const getNotEmptyFilter = (filters: { [key: string]: any }) => {
  const query: any = {};

  for (const [key, value] of Object.entries(filters)) {
    switch (typeof value) {
      case "string":
        if (value !== "") {
          query[key] = value;
        }
        break;

      default:
        if (value != null) {
          query[key] = value;
        }
    }
  }
  return query;
};
