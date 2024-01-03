import { User } from './User';

export interface Itinerary {
  _id: string;
  title: string;
  duration: number;
  price: number;
  _city: string;
  user: User;
  likes?: number;
  hashtags: string[];
  activities?: string[];
  comments?: string[];
}
