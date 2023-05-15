/* istanbul ignore file */
/* eslint-disable */

import type { Prompt } from './Prompt';

export type ProductFilterPrompt = {
    price?: Prompt;
    rating?: Prompt;
    count?: Prompt;
    categoryIds?: Array<number> | null;
};

