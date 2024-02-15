import { SortOption } from '../../../models/SortOption';

// El orden es importante ya que despues se usa para mostrar las opciones en el select
const citiesSortOptions: SortOption[] = [
  {
    label: 'Most Popular',
    rawValue: 'rating',
    order: 'desc',
  },
  {
    label: 'Most recent',
    rawValue: 'updatedAt',
    order: 'desc',
  },
  {
    label: 'City (A-Z)',
    rawValue: 'name',
    order: 'asc',
  },
  {
    label: 'City (Z-A)',
    rawValue: 'name',
    order: 'desc',
  },
];

// La opción de ordenación por defecto es la primera de la lista
const defaultSortOption = citiesSortOptions[0];
const citiesSortOptionsLabels = citiesSortOptions.map((option) => option.label);

export { citiesSortOptions, defaultSortOption, citiesSortOptionsLabels };
