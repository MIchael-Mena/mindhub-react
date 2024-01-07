export interface User {
  _id?: string;
  password?: string;
  email?: string;
  firstName: string;
  lastName: string;
  profilePic: string;
  country?: string | null;
  birthDate?: string | null;
  favouritesCities?: string[];
  favouriteActivities?: string[];
  favouriteItineraries?: string[];
}
