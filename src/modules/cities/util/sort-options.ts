import { SortOption } from '../../../models/SortOption';

// El orden es importante ya que despues se usa para mostrar las opciones en el select
const CITIES_SORT_OPTIONS: SortOption[] = [
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
const CITIES_DEFAULT_SORT_OPTION = CITIES_SORT_OPTIONS[0];
const CITIES_SORT_OPTIONS_LABELS = CITIES_SORT_OPTIONS.map(
  (option) => option.label
);

const COMMENTS_SORT_OPTIONS: SortOption[] = [
  {
    label: 'Most recent',
    rawValue: 'createdAt',
    order: 'desc',
  },
  {
    label: 'Most old',
    rawValue: 'createdAt',
    order: 'asc',
  },
];
const COMMENTS_SORT_OPTIONS_LABELS = COMMENTS_SORT_OPTIONS.map(
  (option) => option.label
);
const COMMENT_DEFAULT_SORT_OPTION = COMMENTS_SORT_OPTIONS[0];

export {
  CITIES_SORT_OPTIONS,
  CITIES_DEFAULT_SORT_OPTION,
  CITIES_SORT_OPTIONS_LABELS,
  COMMENTS_SORT_OPTIONS,
  COMMENTS_SORT_OPTIONS_LABELS,
  COMMENT_DEFAULT_SORT_OPTION,
};
