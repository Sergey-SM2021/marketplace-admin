/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Category } from './Category';

export type Feature = {
    id?: number;
    categories?: Array<Category> | null;
    name?: string | null;
};

