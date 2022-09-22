import { IUser } from "./iuser";

export interface IPost {
  id: number
  userId: number;
  parentId?: number
  userObj?: IUser;
  title: string;
  content: string;
  children: number[];
  allLikeId:number[];
  date: Date;
  allDislikeId:number[];

}
