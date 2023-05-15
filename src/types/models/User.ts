/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Payment } from './Payment';
import type { UserRole } from './UserRole';

export type User = {
    id?: number;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    password?: string | null;
    phone?: string | null;
    roleId?: number;
    userRole?: UserRole;
    paymentMethod?: Array<Payment> | null;
};

