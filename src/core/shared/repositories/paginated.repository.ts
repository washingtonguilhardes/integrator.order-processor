export interface PaginatedResponse<T> {
  total: number;
  entries: T[];
  pageSize: number;
}
export interface PaginatedRepository<T> {
  getAll(page: number, limit: number): Promise<PaginatedResponse<T>>;
  count(): Promise<number>;
}
