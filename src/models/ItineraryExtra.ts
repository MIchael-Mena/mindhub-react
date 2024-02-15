import { Activity } from './Acitivity';
import { Comment } from './Comment';
import { PaginationData } from './PaginationData';

export interface ItineraryExtraState {
  commentParams: CommentSearchParams & PaginationData;
  comments: Comment[];
  activities: Activity[];
  itineraryId: string;
}

export interface CommentSearchParams {
  order?: 'asc' | 'desc';
  page: number;
  sort?: string;
}
