import { Dict } from './../../types/dict.type';
import { QueryHelper } from './../../helpers/query.helper';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from "@nestjs/common";
import { Post, PaginatedPost, PaginatedPost2 } from '~src/components/post/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { PostArgs } from '~src/components/post/dto/post.args';
import { PostsArgs } from '~src/components/post/dto/posts.args';
import { PostsPaginateArgs } from '~src/components/post/dto/post-paginate.args';
import { PostInput } from '~src/components/post/dto/post.input';
import { User } from '~src/components/user/user.schema';
import { CommonService } from '~src/components/common/common.service';
import { PostUpdate } from '~components/post/dto/post.update';

@Injectable()
export class PostService extends CommonService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Post.name)
    private readonly model: Model<Post>,
  ) {
    super();
  }

  private shareFilterProcess(query: Dict<any>): Dict<any> {
    const filter = {};
    const likeKeys = ['title', 'description'];
    QueryHelper.mapFilterLike(filter, query, likeKeys)

    const eqKeys = ['user_id']
    QueryHelper.mapFilterEq(filter, query, eqKeys)

    // Gtes
    const gteKeys = ['likes'];
    QueryHelper.mapFilterOperation('$gte', query, gteKeys)
    return filter;
  }

  /**
   * Find One Post
   * @param query 
   */
  async findOne(query: PostArgs): Promise<Post> {

    const filter = this.shareFilterProcess(query);

    return await this.model.findOne(filter).exec();
  }

  /**
   * Find Many Posts
   * @param query
   */
  async find(query: PostsArgs): Promise<PaginatedPost2> {

    const filter = this.shareFilterProcess(query);

    const result = await this.sharePaginate(this.model, filter, query, [
      {
        $addFields: {
          'id': "$_id",
          'likes': {
            $cond: {
              if: { $isArray: "$like_users" },
              then: { $size: "$like_users" },
              else: 0
            }
          }
        }
      }
    ]);

    return result as PaginatedPost2;
  }

  /**
   * Count User Posts
   * @param user_id 
   */
  async countByUser(user_id: string): Promise<number> {
    return await this.model.find({ user_id }).count();
  }

  /**
   * Find Many Posts
   * @
   */
  async paginate(query: PostsPaginateArgs): Promise<PaginatedPost> {

    // Create Share Filter
    const filter = this.shareFilterProcess(query);

    return await this.sharePaginate(this.model, filter, query, [
      {
        $addFields: {
          'id': "$_id",
          'likes': {
            $cond: {
              if: { $isArray: "$like_users" },
              then: { $size: "$like_users" },
              else: 0
            }
          }
        }
      }
    ]);
  }

  /**
   * Create New Post
   * @param {PostInput} create 
   * 
   * @return Promise<Post>
   */
  async create(create: PostInput): Promise<Post> {

    const user = await this.userModel.findById(create.user_id).exec();

    if (!user) {
      throw new NotFoundException(`User(${create.user_id}) not found!`);
    }

    try {
      // Create a new post
      const post = new this.model(create);

      return await post.save()
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /**
   * Update Post
   * @param post_id 
   */
  async update(post_id: string, update: PostUpdate): Promise<Post | boolean> {

    let post = await this.model.findById(post_id).exec();

    if (!post) {
      return false;
    }
    try {
      post = post.set(update);
      await post.save();
    } catch (e) {
      console.error(e);
      return false;
    }
    return post;
  }

  /**
   * Delete Post
   * 
   * @return Promise<boolean>
   */
  async delete(post_id: string): Promise<Post | boolean> {
    const post = await this.model.findById(post_id).exec();

    if (!post) {
      return false;
    }

    try {
      await post.deleteOne()
    } catch (e) {
      return false;
    }
    return post;
  }

  /**
   * Like Post
   * @param user 
   * @param post_id 
   */
  async likePost(user: User, post_id: string): Promise<boolean> {

    const post = await this.model.findById(post_id);

    if (!post) {
      return false;
    }

    // find user on post
    const hadLike = post.like_users.find(s_user => s_user.id == user.id,);
    if (!hadLike) {

      // Add user likes
      post.like_users.push({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        age: user.age,
        created_at: new Date(),
      });
      post.markModified('like_users');
      await post.save();
    }

    return true;
  }

  /**
   * Unlike Post
   * @param user 
   * @param post_id 
   */
  async unlikePost(user: User, post_id: string): Promise<boolean> {

    const post = await this.model.findById(post_id);

    if (!post) {
      return false;
    }

    // find user on post
    const userIndex = post.like_users.findIndex(s_user => s_user.id == user.id,);
    if (userIndex >= 0) {

      // Remove user likes
      post.like_users.splice(userIndex, 1);
      post.markModified('like_users');
      await post.save();
    }

    return true;
  }

}