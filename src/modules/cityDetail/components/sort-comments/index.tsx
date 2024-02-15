import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchCommentsWithValidation } from '../../../../store/actions/itinerary-extra';
import { SortButton } from '../../../shared/components/sort-button';
import {
  COMMENTS_SORT_OPTIONS,
  COMMENTS_SORT_OPTIONS_LABELS,
} from '../../../cities/util/sort-options';

const SortComments = () => {
  const initialSortOrderIndex = 0; // COMMENTS_SORT_OPTIONS.indexOf(COMMENTS_DEFAULT_SORT_OPTION)
  const dispatch = useAppDispatch();
  const itineraryId = useAppSelector(
    (state) => state.itineraryExtraReducer.data.itineraryId
  );

  const [currentSortOrderIndex, setCurrentSortIndex] = useState<number>(
    initialSortOrderIndex
  );

  const handleSortOrderChange = (selectedSortOrderIndex: number) => {
    setCurrentSortIndex(selectedSortOrderIndex);
    dispatch(
      fetchCommentsWithValidation({
        order: COMMENTS_SORT_OPTIONS[selectedSortOrderIndex].order,
        sort: COMMENTS_SORT_OPTIONS[selectedSortOrderIndex].rawValue,
        page: 1,
      })
    );
  };

  useEffect(() => {
    setCurrentSortIndex(initialSortOrderIndex);
  }, [itineraryId]);

  return (
    <SortButton
      currentSortIndex={currentSortOrderIndex}
      sortsAvailable={COMMENTS_SORT_OPTIONS_LABELS}
      onSortSelected={handleSortOrderChange}
    />
  );
};

export default SortComments;
