import { Module, DynamicModule, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, User } from "~src/components/user/user.schema";
import { UserController } from "~src/components/user/user.controller";
import { UserService } from "~src/components/user/user.service";
import { UserResolver } from "~src/components/user/user.resolver";
import { PostModule } from "~src/components/post/post.module";
import { SafeService } from "~src/services/safe.service";
import { AuthModule } from "~components/auth/auth.module";


@Module({
})
export class UserModule {

  static forRoot(): DynamicModule {
    return {
      module: UserModule,
      imports: [
        AuthModule.forShare(),
        PostModule.forShare(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [
        UserController,
      ],
      providers: [
        UserService, UserResolver, SafeService
      ],
    };
  }

  static forShare(): DynamicModule {
    return {
      module: UserModule,
      imports: [
        PostModule.forShare(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [
        UserService, SafeService
      ],
      exports: [
        MongooseModule,
        UserService,
      ]
    };
  }

  static forModel(): DynamicModule {
    return {
      module: UserModule,
      imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      exports: [
        MongooseModule,
      ]
    };
  }
}