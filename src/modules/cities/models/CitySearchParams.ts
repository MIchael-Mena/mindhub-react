export interface CitySearchParams {
  search: string;
  // sort: (typeof citiesSortOptionsMapping)[keyof typeof citiesSortOptionsMapping]; // Para que el tipo de dato de sort sea el mismo que el de sortOptionsMapping
  sort: string; // Valor en crudo que se usa en el backend no en el select
  order: 'asc' | 'desc';
  page: number;
}
