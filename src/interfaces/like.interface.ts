import { IBlog } from "./blog.interface";
import { IUser } from "./user.interface";

export interface ILike {
  id: number;
  blogId: number;
  userId: number;
  blog?: IBlog;
  user?: IUser;
}
