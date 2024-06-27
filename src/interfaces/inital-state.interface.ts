export interface InitialState<T> {
  data: T;
  loading: boolean;
  error: string | null
}