/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FeatureIdValue } from './FeatureIdValue';

export type CreateProductCommand = {
    name?: string | null;
    categoryId?: number | null;
    info?: string | null;
    price?: number;
    count?: number;
    featureValue?: Array<FeatureIdValue> | null;
};

