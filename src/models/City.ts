import { CityBasic } from './CityBasic';
import { Itinerary } from './Itinerary';

export interface City extends CityBasic {
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
