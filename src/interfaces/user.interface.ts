import { IComment } from "./comment.interface";
import { IDislike } from "./dislike.interface";
import { ILike } from "./like.interface";

export enum Role{
  admin = "admin",
  moderator = "moderator",
  member = "member",
}

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  student_id: string;
  department: string;
  password: string;
  role: Role;
  createdAt: Date;
  comments: IComment[];
  Like: ILike[];
  dislikes: IDislike[];
}
