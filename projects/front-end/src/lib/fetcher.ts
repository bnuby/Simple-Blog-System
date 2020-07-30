import { GraphQLClient } from "graphql-request";
import { api } from "~src/config.json";

export default (query: string, authKey?: string): Promise<any> => {
  const client = new GraphQLClient(`${api.host}:${api.port}${api.path}`);

  if (authKey) {
    client.setHeader("Authorization", `Bearer ${authKey}`);
  }
  return client.request(query);
};
