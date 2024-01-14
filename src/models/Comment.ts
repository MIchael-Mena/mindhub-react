import { User } from './User';

export interface Comment {
  _id?: string;
  _user: User;
  _reference: string;
  onModel: string;
  text: string;
  updatedAt?: string;
  createdAt?: string;
}
