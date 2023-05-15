/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Claim } from '../models/Claim';
import type { enumRoles } from '../models/enumRoles';
import type { Payment } from '../models/Payment';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthorizeService {

    /**
     * @param firstName
     * @param lastName
     * @param email
     * @param password
     * @param phone
     * @param roleId
     * @param userRoleRoleName
     * @param userRoleRoleId
     * @param userRoleUsers
     * @param userRoleId
     * @param paymentMethod
     * @param id
     * @returns any Success
     * @throws ApiError
     */
    public static postSignIn(
        firstName?: string,
        lastName?: string,
        email?: string,
        password?: string,
        phone?: string,
        roleId?: number,
        userRoleRoleName?: enumRoles,
        userRoleRoleId?: number,
        userRoleUsers?: Array<User>,
        userRoleId?: number,
        paymentMethod?: Array<Payment>,
        id?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/SignIn',
            query: {
                'FirstName': firstName,
                'LastName': lastName,
                'Email': email,
                'Password': password,
                'Phone': phone,
                'RoleId': roleId,
                'UserRole.RoleName': userRoleRoleName,
                'UserRole.RoleId': userRoleRoleId,
                'UserRole.Users': userRoleUsers,
                'UserRole.Id': userRoleId,
                'PaymentMethod': paymentMethod,
                'Id': id,
            },
        });
    }

    /**
     * @param firstName
     * @param lastName
     * @param email
     * @param password
     * @param phone
     * @param roleId
     * @param userRoleRoleName
     * @param userRoleRoleId
     * @param userRoleUsers
     * @param userRoleId
     * @param paymentMethod
     * @param id
     * @returns any Success
     * @throws ApiError
     */
    public static postRegister(
        firstName?: string,
        lastName?: string,
        email?: string,
        password?: string,
        phone?: string,
        roleId?: number,
        userRoleRoleName?: enumRoles,
        userRoleRoleId?: number,
        userRoleUsers?: Array<User>,
        userRoleId?: number,
        paymentMethod?: Array<Payment>,
        id?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/Register',
            query: {
                'FirstName': firstName,
                'LastName': lastName,
                'Email': email,
                'Password': password,
                'Phone': phone,
                'RoleId': roleId,
                'UserRole.RoleName': userRoleRoleName,
                'UserRole.RoleId': userRoleRoleId,
                'UserRole.Users': userRoleUsers,
                'UserRole.Id': userRoleId,
                'PaymentMethod': paymentMethod,
                'Id': id,
            },
        });
    }

    /**
     * @param id
     * @param userName
     * @param normalizedUserName
     * @param email
     * @param normalizedEmail
     * @param emailConfirmed
     * @param passwordHash
     * @param securityStamp
     * @param concurrencyStamp
     * @param phoneNumber
     * @param phoneNumberConfirmed
     * @param twoFactorEnabled
     * @param lockoutEnd
     * @param lockoutEnabled
     * @param accessFailedCount
     * @param principal
     * @returns string Success
     * @throws ApiError
     */
    public static getGetToken(
        id?: string,
        userName?: string,
        normalizedUserName?: string,
        email?: string,
        normalizedEmail?: string,
        emailConfirmed?: boolean,
        passwordHash?: string,
        securityStamp?: string,
        concurrencyStamp?: string,
        phoneNumber?: string,
        phoneNumberConfirmed?: boolean,
        twoFactorEnabled?: boolean,
        lockoutEnd?: string,
        lockoutEnabled?: boolean,
        accessFailedCount?: number,
        principal?: Array<Claim>,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/GetToken',
            query: {
                'Id': id,
                'UserName': userName,
                'NormalizedUserName': normalizedUserName,
                'Email': email,
                'NormalizedEmail': normalizedEmail,
                'EmailConfirmed': emailConfirmed,
                'PasswordHash': passwordHash,
                'SecurityStamp': securityStamp,
                'ConcurrencyStamp': concurrencyStamp,
                'PhoneNumber': phoneNumber,
                'PhoneNumberConfirmed': phoneNumberConfirmed,
                'TwoFactorEnabled': twoFactorEnabled,
                'LockoutEnd': lockoutEnd,
                'LockoutEnabled': lockoutEnabled,
                'AccessFailedCount': accessFailedCount,
                'principal': principal,
            },
        });
    }

}
