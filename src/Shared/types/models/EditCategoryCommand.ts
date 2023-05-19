/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EditCategoryCommand = {
    categoryId?: number;
    name?: string | null;
    parentCategoryId?: number | null;
    linkedFeatures?: Array<number> | null;
};

