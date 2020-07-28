import { GqlExceptionFilter } from "@nestjs/graphql";
import { ArgumentsHost, HttpException, Catch } from "@nestjs/common";
import { setTimeout } from "timers";

@Catch(Error)
export class GraphqlExceptionFilter implements GqlExceptionFilter {

  catch(exception: any, host: ArgumentsHost) {

    let response: any = exception;

    if (exception instanceof HttpException) {
      if (exception.getResponse()) {
        response = exception.getResponse()['message'];
        return new Error(response);
      }
    }

    return response;
  }

}