import { ResTyped } from "~types/res.type";
import { Post } from "~components/post/post.schema";
import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ResTypePost extends ResTyped(Post) {
}