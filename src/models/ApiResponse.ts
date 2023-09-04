export interface ApiResponse<T> {
  success: boolean;
  message: string | any;
  data: T;
  timestamp: string;
}
