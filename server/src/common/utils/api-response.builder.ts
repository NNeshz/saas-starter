import { BaseApiResponse, PaginatedApiResponse } from '../types/api-response.types';

export class ApiResponseBuilder {
    static success<T>(
        data: T,
        message?: string,
        metadata?: Record<string, any>
    ): BaseApiResponse<T> {
        return {
            status: 'success',
            data,
            message,
            metadata,
        };
    }

    static paginated<T>(
        data: T[],
        total: number,
        page: number,
        limit: number,
        metadata?: Record<string, any>
    ): PaginatedApiResponse<T> {
        return {
            status: 'success',
            data,
            metadata: {
                pagination: {
                    total,
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    limit,
                },
                ...metadata,
            },
        };
    }

    static error(error: any, message?: string): BaseApiResponse<null> {
        return {
            status: 'error',
            message: message || error,
            data: null,
        };
    }

} 