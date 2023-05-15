/* istanbul ignore file */
/* eslint-disable */

import type { Category } from './Category';
import type { FeatureResponseDTO } from './FeatureResponseDTO';

export type CategoryResponseTreeDTO = {
    id?: number;
    name?: string | null;
    categoryId?: number;
    parentCategoryId?: number | null;
    parentCategory?: Category;
    childCategories?: Array<Category> | null;
    features?: Array<FeatureResponseDTO> | null;
};

