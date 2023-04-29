/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UtilityService {

    /**
     * Очистить БД
     * @returns any Success
     * @throws ApiError
     */
    public static deleteUtilityTruncateDatabase(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/Utility/TruncateDatabase',
        });
    }

    /**
     * Заполнить БД Тестовыми данными
     * @returns string Success
     * @throws ApiError
     */
    public static postUtilitySeedDatabase(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/Utility/SeedDatabase',
        });
    }

}
