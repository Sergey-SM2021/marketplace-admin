/* istanbul ignore file */
/* eslint-disable */

import type { FeatureIdValue } from './FeatureIdValue';

export type EditProductCommand = {
    productId?: number;
    name?: string | null;
    categoryId?: number | null;
    info?: string | null;
    price?: number | null;
    featureValue?: Array<FeatureIdValue> | null;
};

