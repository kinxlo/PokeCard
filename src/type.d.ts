declare global {
  /** Generic API response wrapper */
  interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
  }

  /** Pagination metadata */
  interface PaginationMetadata {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }
}

export {};
