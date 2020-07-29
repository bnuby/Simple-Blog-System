import { CreateUserInput } from './dto/create-user.input';
import { Injectable, Logger } from "@nestjs/common";
import { Model } from "mongoose";
import { User, PaginatedUser, PaginatedUser2 } from "~src/components/user/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDTO } from "~src/components/user/dto/create-user.dto";
import { FindUserDTO } from "~src/components/user/dto/find-user.dto";
import { UsersArgs } from "~src/components/user/dto/users.args";
import { UpdateUserInput } from '~src/components/user/dto/update-user.input';
import { Dict } from '~src/types/dict.type';
import { UserPaginateArgs } from '~src/components/user/dto/user-paginate.args';
import { CommonService } from '~src/components/common/common.service';
import { PostService } from '~src/components/post/post.service';

@Injectable()
export class UserService extends CommonService {

  public constructor(
    @InjectModel(User.name)
    private readonly model: Model<User>,
    private readonly postService: PostService,
  ) {
    super();
  }

  /**
   * Create Share Filter
   * @param query 
   */
  private createShareFilterProcess(query: Dict<any>) {
    const filter: Dict<any> = {};

    if (query.first_name != null) {
      filter.first_name = {
        $regex: new RegExp(`^${query.first_name}.*`),
      }
    }

    if (query.last_name != null) {
      filter.last_name = {
        $regex: new RegExp(`^${query.last_name}.*`),
      }
    }


    if (query.email != null) {
      filter.email = {
        $regex: new RegExp(`^${query.email}.*`),
      }
    }

    if (query.ageGte != null) {
      filter.age = {
        $gte: query.ageGte
      }
    }

    return filter
  }

  /**
   * Get User By Id
   * @param user_id 
   */
  async findOneById(user_id: string): Promise<User> {
    return await this.model.findById(user_id).exec();
  }

  /**
   * Get User With Query
   * @param query 
   */
  async findOne(query: FindUserDTO): Promise<User> {

    // Create Share Filter
    const filter: Dict<any> = this.createShareFilterProcess(query);

    return await this.model.findOne(filter).exec();
  }

  /**
   * Find Many Users With Query
   * @param filter Filtering Options
   */
  async find(query: UsersArgs): Promise<PaginatedUser2> {

    // Create Share Filter
    const filter: Dict<any> = this.createShareFilterProcess(query);

    const users = await this.sharePaginate(this.model, filter, query, [
      {
        $addFields: {
          'id': "$_id",
          'full_name': {
            $concat: ["$first_name", " ", "$last_name"]
          }
        }
      }
    ]);

    return users;
  }

  /**
   * Paginate User
   * @param query
   */
  async paginate(query: UserPaginateArgs): Promise<PaginatedUser> {

    // Create Share Filter
    const filter = this.createShareFilterProcess(query);

    return await this.sharePaginate(this.model, filter, query, [
      {
        $addFields: {
          'id': "$_id",
          'full_name': {
            $concat: ["$first_name", " ", "$last_name"]
          }
        }
      }
    ]);
  }

  /**
   * Create New User
   * @param create 
   */
  async create(create: CreateUserDTO | CreateUserInput | Dict<any> ): Promise<boolean> {

    let user = await this.findOne({email: create.email});
    if (user) {
      return false;
    }

    try {
      user = new this.model(create);
      await user.save()
    } catch (e) {
      Logger.log(e.toString());
      return false;
    }
    return true
  }

  /**
   * Update user
   */
  async update(id: string, update: UpdateUserInput): Promise<boolean> {
    try {
      const user = await this.model.findById(id);
      await user.updateOne(update);
    } catch (e) {
      Logger.log(e.toString());
      return false;
    }
    return true;
  }

  /**
   * Delete User
   * @param id userId
   */
  async delete(id: string): Promise<boolean> {
    try {

      // Check User
      const user = await this.model.findById(id).exec();
      if (!user) {
        return false;
      }

      // Check is User Had Post
      const postCount = await this.postService.countByUser(id);
      if (postCount) {
        return false;
      }

      // Delete User
      await user.deleteOne();

    } catch (e) {
      Logger.log(e)
      return false;
    }
    return true;
  }

}