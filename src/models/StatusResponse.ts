export interface StatusResponse<T, P> {
  data: T;
  loading: boolean;
  error: P | null;
}
