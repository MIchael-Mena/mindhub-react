const citiesSortOptionsMapping = {
  // 'Most recent': 'updatedAt',
  'Most Popular': 'rating',
  'City (A-Z)': 'name_asc',
  'City (Z-A)': 'name_desc',
  // City: 'name',
  // Country: 'country',
};

const defaultSort = Object.keys(citiesSortOptionsMapping)[0];
const defaultSortValue = Object.values(citiesSortOptionsMapping)[0].split(
  '_'
)[0];

export { citiesSortOptionsMapping, defaultSort, defaultSortValue };
