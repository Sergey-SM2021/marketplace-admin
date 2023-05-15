/* istanbul ignore file */
/* eslint-disable */

import type { Category } from './Category';
import type { Feature } from './Feature';

export type CategoryResponseDTO = {
    id?: number;
    name?: string | null;
    parentCategoryId?: number | null;
    parentCategory?: Category;
    features?: Array<Feature> | null;
};

