import { Activity } from './Acitivity';
import { Comment } from './Comment';
import { PaginationData } from './PaginationData';

export interface ItineraryExtraState {
  commentParams: CommentPaginationOptions & PaginationData;
  comments: Comment[];
  activities: Activity[];
  itineraryId: string;
}

export interface CommentPaginationOptions {
  order?: 'asc' | 'desc';
  page: number;
}
