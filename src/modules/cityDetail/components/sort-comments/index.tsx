import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchComments } from '../../../../store/actions/itinerary-extra';
import { SortButton } from '../../../shared/components/sort-button';
import { SortOption } from '../../../../models/SortOption';

const sortsComments: SortOption[] = [
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

const sortCommentsLabels = sortsComments.map((option) => option.label);

const SortComments = () => {
  const initialSortIndex = 0;
  const dispatch = useAppDispatch();
  const tinerraryId = useAppSelector(
    (state) => state.itineraryExtraReducer.data.itineraryId
  );

  const [currentSortIndex, setCurrentSortIndex] =
    useState<number>(initialSortIndex);

  const handleSort = (selectedSortIndex: number) => {
    setCurrentSortIndex(selectedSortIndex);
    dispatch(
      fetchComments({
        // order: Object.values(sortsAvailable)[selectedSortIndex],
        order: sortsComments[selectedSortIndex].order,
        page: 1,
      })
    );
  };

  useEffect(() => {
    setCurrentSortIndex(initialSortIndex);
  }, [tinerraryId]);

  return (
    <SortButton
      currentSortIndex={currentSortIndex}
      sortsAvailable={sortCommentsLabels}
      onSortSelected={handleSort}
    />
  );
};

export default SortComments;
