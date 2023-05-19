/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Claim } from './Claim';

export type ClaimsIdentity = {
    readonly authenticationType?: string | null;
    readonly isAuthenticated?: boolean;
    actor?: ClaimsIdentity;
    bootstrapContext?: any;
    readonly claims?: Array<Claim> | null;
    label?: string | null;
    readonly name?: string | null;
    readonly nameClaimType?: string | null;
    readonly roleClaimType?: string | null;
};

