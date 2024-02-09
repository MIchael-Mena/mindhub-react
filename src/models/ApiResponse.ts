export interface ApiResponse<T> {
  success: boolean;
  message: string | string[];
  token?: string;
  data?: T;
  timestamp: string;
}
