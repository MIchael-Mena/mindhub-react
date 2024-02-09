import { sortOptionsMapping } from '../util/sort-options';

export interface CitySearchParams {
  // currentOrder: string; // 'asc' | 'desc'
  search: string;
  // sort: keyof typeof sortOptionsMapping;
  sort: (typeof sortOptionsMapping)[keyof typeof sortOptionsMapping]; // Para que el tipo de dato de sort sea el mismo que el de sortOptionsMapping
  page: number;
}
