import { IBlog } from "./blog.interface";
import { IUser } from "./user.interface";

export interface IComment {
  id: number;
  content: string;
  createdAt: Date;
  blogId: number;
  userId: number;
  blog?: IBlog;
  user?: IUser;
}
