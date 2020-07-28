import { Module, forwardRef, DynamicModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PostSchema, Post } from "~src/components/post/post.schema";
import { PostService } from "~src/components/post/post.service";
import { PostResolver } from "~src/components/post/post.resolver";
import { UserModule } from "~src/components/user/user.module";
import { AuthModule } from "~components/auth/auth.module";

@Module({
})
export class PostModule {

  static forRoot(): DynamicModule {
    return {
      module: PostModule,
      imports: [
        UserModule.forShare(),
        AuthModule.forShare(),
        MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])
      ],
      providers: [
        PostService, PostResolver,
      ],
      exports: [
        MongooseModule, PostService, PostResolver,
      ]
    }
  }

  static forShare(): DynamicModule {
    return {
      module: PostModule,
      imports: [
        UserModule.forModel(),
        MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])
      ],
      providers: [
        PostService,
      ],
      exports: [
        MongooseModule, PostService,
      ]
    }
  }

  static forModel(): DynamicModule {
    return {
      module: PostModule,
      imports: [
        MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])
      ],
      exports: [
        MongooseModule,
      ],
    };
  }
}