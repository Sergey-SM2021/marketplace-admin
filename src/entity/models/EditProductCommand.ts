/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EditProductCommand = {
    productId?: number;
    name?: string | null;
    categoryId?: number | null;
    info?: string | null;
    price?: number | null;
    rating?: number | null;
    featureValue?: Record<string, string | null> | null;
};

