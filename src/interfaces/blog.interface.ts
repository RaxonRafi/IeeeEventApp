import { IComment } from "./comment.interface";
import { IDislike } from "./dislike.interface";
import { ILike } from "./like.interface";

export interface IBlog {
  title: string;
  content: string;
  createdAt: Date;
  comments: IComment[];
  likes: ILike[];
  dislikes: IDislike[];
}
