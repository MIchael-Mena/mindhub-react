export interface Itinerary extends Document {
  _id?: string;
  title: string;
  duration: number;
  price: number;
  _city: string;
  user: string;
  likes: number;
  hashtags: string[];
  activities?: string[];
  comments?: string[];
}
