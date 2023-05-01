/* istanbul ignore file */
/* eslint-disable */

import type { Category } from './Category';
import type { FeatureResponseDTO } from './FeatureResponseDTO';

export type CategoryResponseDTO = {
    id?: number;
    name?: string | null;
    parentCategoryId?: number | null;
    parentCategory?: Category;
    features?: Array<FeatureResponseDTO> | null;
};

