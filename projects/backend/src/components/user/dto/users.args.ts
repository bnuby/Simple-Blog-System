import { ArgsType } from "@nestjs/graphql";
import { UserArgs } from "~src/components/user/dto/user.args";
import { PaginateFilterd } from "~types/paginate.type";

@ArgsType()
export class UsersArgs extends PaginateFilterd(UserArgs, 'normal') {
}