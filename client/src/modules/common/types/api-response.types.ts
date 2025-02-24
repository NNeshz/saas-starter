export interface BaseApiResponse<T> {
    status: 'success' | 'error';
    data: T;
    message?: string;
    metadata?: Record<string, unknown>;
}

export interface PaginatedApiResponse<T> extends BaseApiResponse<T[]> {
    metadata: {
        pagination: {
            total: number;
            currentPage: number;
            totalPages: number;
            limit: number;
        };
    };
}