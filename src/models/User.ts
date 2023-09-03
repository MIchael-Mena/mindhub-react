export interface User {
  _id?: string;
  password?: string;
  email: string;
  name: string;
  surname: string;
  country: string;
  age: number;
  profilePic: string;
  favouritesCities?: string[];
  favouriteActivities?: string[];
  favouriteItineraries?: string[];
}
