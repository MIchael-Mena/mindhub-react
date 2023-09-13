export interface User {
  _id?: string;
  password?: string;
  email: string;
  name: string;
  surname: string;
  profilePic: string;
  country?: string;
  birthDate?: string;
  favouritesCities?: string[];
  favouriteActivities?: string[];
  favouriteItineraries?: string[];
}
