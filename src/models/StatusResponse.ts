import { SerializedError } from '@reduxjs/toolkit';

export interface StatusResponse<T> {
  data: T;
  loading: boolean;
  error: SerializedError | null;
}
