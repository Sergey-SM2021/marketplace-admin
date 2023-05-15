/* istanbul ignore file */
/* eslint-disable */

import type { ProductResponseDTO } from './ProductResponseDTO';

export type GetProductsResponse = {
    products?: Array<ProductResponseDTO> | null;
    readonly pageSize?: number;
    readonly pageIndex?: number;
    totalPages?: number;
    totalItems?: number;
};

