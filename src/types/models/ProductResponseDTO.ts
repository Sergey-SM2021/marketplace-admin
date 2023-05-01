/* istanbul ignore file */
/* eslint-disable */

import type { FeatureResponseDTO } from './FeatureResponseDTO';

export type ProductResponseDTO = {
    id?: number;
    name?: string | null;
    categoryId?: number | null;
    categoryName?: string | null;
    features?: Array<FeatureResponseDTO> | null;
    info?: string | null;
    price?: number | null;
    rating?: number | null;
};

