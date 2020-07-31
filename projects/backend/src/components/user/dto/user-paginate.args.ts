import { PaginateFilterd } from '~src/types/paginate.type';
import { ArgsType } from '@nestjs/graphql';
import { UserArgs } from '~src/components/user/dto/user.args';

@ArgsType()
export class UserPaginateArgs extends PaginateFilterd(UserArgs) {}
