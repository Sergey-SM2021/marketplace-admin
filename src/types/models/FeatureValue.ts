/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Feature } from './Feature';
import type { Product } from './Product';

export type FeatureValue = {
    id?: number;
    productId?: number;
    product?: Product;
    featureId?: number;
    feature?: Feature;
    value?: string | null;
};

