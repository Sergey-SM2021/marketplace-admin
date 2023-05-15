/* istanbul ignore file */
/* eslint-disable */

export type CreateCategoryCommand = {
    name?: string | null;
    parentCategoryId?: number | null;
    features?: Array<string> | null;
};

