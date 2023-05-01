/* istanbul ignore file */
/* eslint-disable */

import type { Feature } from './Feature';
import type { Product } from './Product';

export type Category = {
    id?: number;
    name?: string | null;
    parentCategoryId?: number | null;
    parentCategory?: Category;
    childCategories?: Array<Category> | null;
    features?: Array<Feature> | null;
    products?: Array<Product> | null;
};

