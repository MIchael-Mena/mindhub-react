import { Activity } from './Acitivity';
import { Comment } from './Comment';
import { PaginationData } from './PaginationData';

export interface ItineraryExtraState {
  commentParams: {
    currentPage: number;
  } & PaginationData;
  comments: Comment[];
  activities: Activity[];
  itineraryId: string;
}
