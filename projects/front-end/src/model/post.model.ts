import SimpleUserModel from "~src/model/simple-user.model";

export default interface PostModel {
  id: string;
  title: string;
  description: string;
  likes: number;
  like_users: SimpleUserModel[];
  user: SimpleUserModel;
  user_id: string;
  keywords: string[];
  created_at: string;
  updated_at: string;
}
