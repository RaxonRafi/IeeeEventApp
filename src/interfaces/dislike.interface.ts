import { IBlog } from "./blog.interface";
import { IUser } from "./user.interface";

export interface IDislike {
  id: number;
  blogId: number;
  userId: number;
  blog?: IBlog;
  user?: IUser;
}
