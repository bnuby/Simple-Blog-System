import { ArgsType } from '@nestjs/graphql';
import { PaginateFilterd } from '~src/types/paginate.type';
import { PostArgs } from '~src/components/post/dto/post.args';

@ArgsType()
export class PostsPaginateArgs extends PaginateFilterd(PostArgs) {
  static create(opts?: { [key: string]: string }): PostsPaginateArgs {
    const paginate = new PostsPaginateArgs();
    const keys = ['title', 'description', 'likes', 'user_id'];
    keys.forEach(key => {
      if (opts[key] != null) {
        paginate[key] = opts[key];
      }
    });

    paginate.user_id = opts.user_id;
    return paginate;
  }
}
