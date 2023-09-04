import { Itinerary } from './Itinerary';

export interface City {
  _id: string;
  name: string;
  description: string;
  country: string;
  images: string[];
  capital: boolean;
  population: number;
  area: number;
  rating: number;
  language: string;
  currency: string;
  religion: string;
  bestTime: string;
  timezone: string;
  itineraries?: Itinerary[];
}
