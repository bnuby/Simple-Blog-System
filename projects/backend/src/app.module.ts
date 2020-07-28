import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '~components/user/user.module';
import { DatabaseModule } from './database.module';
import { PostModule } from '~components/post/post.module';
import { AuthModule } from '~components/auth/auth.module';
import { GqlLoggingPlugin } from '~src/plugins/gql-logging.plugin';
import { get } from 'lodash';
import { AuthService } from '~components/auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule.forRoot(),
    UserModule.forRoot(),
    PostModule.forRoot(),
    AuthModule.forRoot(),
    GraphQLModule.forRootAsync({
      imports: [AuthModule.forShare()],
      inject: [AuthService.name],
      useFactory: async (authService: AuthService) => {

        return {
          disableHealthCheck: true,
          debug: true,
          playground: true,
          installSubscriptionHandlers: true,
          autoSchemaFile: 'schema.gql',
          plugins: [
            new GqlLoggingPlugin(),
          ],
          context: ({ request }) => {
            return ({
              authScope: get(request, 'headers.authorization', null),
              req: request,
            })
          },
          subscriptions: {
            // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
            onConnect: async (connectionParams) => {

              try {
                const [, token] = connectionParams['authorization'].split(' ');

                return await authService.validateToken(token);
              } catch (e) {
                return false;
              }
            }
          }
        }
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
