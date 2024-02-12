import { citiesSortOptionsMapping } from '../util/cities-sort-options';

export interface CitySearchParams {
  // currentOrder: string; // 'asc' | 'desc'
  search: string;
  // sort: keyof typeof sortOptionsMapping;
  sort: (typeof citiesSortOptionsMapping)[keyof typeof citiesSortOptionsMapping]; // Para que el tipo de dato de sort sea el mismo que el de sortOptionsMapping
  page: number;
}
