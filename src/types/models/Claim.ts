/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClaimsIdentity } from './ClaimsIdentity';

export type Claim = {
    readonly issuer?: string | null;
    readonly originalIssuer?: string | null;
    readonly properties?: Record<string, string> | null;
    subject?: ClaimsIdentity;
    readonly type?: string | null;
    readonly value?: string | null;
    readonly valueType?: string | null;
};

