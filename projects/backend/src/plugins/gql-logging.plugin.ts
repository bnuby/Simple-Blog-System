import { Plugin } from "@nestjs/graphql";
import {
  ApolloServerPlugin,
} from "apollo-server-plugin-base";

@Plugin()
export class GqlLoggingPlugin implements ApolloServerPlugin {

}