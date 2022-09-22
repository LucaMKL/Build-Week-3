import { IUser } from "./iuser";

export interface IPost {
  id: number
  userId: number;
  userObj?: IUser;
  title: string;
  content: string;
  children: IPost[];
  allLikeId:number[];
  date: Date;
  allDislikeId:number[];

}
