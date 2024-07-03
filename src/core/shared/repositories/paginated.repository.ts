export interface PaginatedResponse<T> {
  total: number;
  entries: T[];
  pageSize: number;
}
export interface PaginatedRepository<T, F = unknown> {
  getAll(filter?: F): Promise<PaginatedResponse<T>>;
  count(): Promise<number>;
}
