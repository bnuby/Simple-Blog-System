import { ResType } from './../../types/res.type';
import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { User, PaginatedUser2 } from "~src/components/user/user.schema";
import { UserService } from "~src/components/user/user.service";
import { CreateUserDTO } from '~src/components/user/dto/create-user.dto';
import { UsersArgs } from '~src/components/user/dto/users.args';

@Controller({
  path: 'user'
})
export class UserController {

  public constructor(
    private readonly service: UserService
  ) {
  }

  /**
   * Retrieve All User
   * @param filter 
   */
  @Get()
  async findAll(@Param() filter: UsersArgs): Promise<ResType<PaginatedUser2>> {
    return {
      status: true,
      code: "S_001",
      data: await this.service.find(filter),
    }
  }

  /**
   * Create User
   * @param create 
   */
  @Post()
  async create(
    @Body() create: CreateUserDTO,
  ): Promise<ResType<any>> {

    const user = this.service.create(create)

    if (!user) {
      return {
        status: false,
        code: "F_002",
      };
    }

    return {
      status: true,
      code: "S_002",
    };
  }
}