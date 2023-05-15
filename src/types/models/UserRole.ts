/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { enumRoles } from './enumRoles';
import type { User } from './User';

export type UserRole = {
    id?: number;
    roleName?: enumRoles;
    roleId?: number;
    users?: Array<User> | null;
};

