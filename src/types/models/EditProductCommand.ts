/* istanbul ignore file */
/* eslint-disable */

export type EditProductCommand = {
    productId?: number;
    name?: string | null;
    categoryId?: number | null;
    info?: string | null;
    price?: number | null;
    featureValue?: Record<string, string | null> | null;
};

