/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Category } from './Category';
import type { FeatureValue } from './FeatureValue';

export type Product = {
    id?: number;
    name?: string | null;
    categoryId?: number | null;
    category?: Category;
    featureValues?: Array<FeatureValue> | null;
    info?: string | null;
    price?: number | null;
    rating?: number | null;
    count?: number;
};

