import { ArgsType } from '@nestjs/graphql';
import { PostArgs } from '~src/components/post/dto/post.args';
import { PaginateFilterd } from '~types/paginate.type';

@ArgsType()
export class PostsArgs extends PaginateFilterd(PostArgs, 'normal') {}
