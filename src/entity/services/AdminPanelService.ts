/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCategoryCommand } from '../models/CreateCategoryCommand';
import type { CreateCategoryFeaturesCommand } from '../models/CreateCategoryFeaturesCommand';
import type { CreateCategoryFeaturesResponse } from '../models/CreateCategoryFeaturesResponse';
import type { CreateProductCommand } from '../models/CreateProductCommand';
import type { EditCategoryCommand } from '../models/EditCategoryCommand';
import type { EditProductCommand } from '../models/EditProductCommand';
import type { Product } from '../models/Product';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AdminPanelService {

    /**
     * @param requestBody
     * @returns number Success
     * @throws ApiError
     */
    public static postAdminPanelCreateCategory(
        requestBody?: CreateCategoryCommand,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/AdminPanel/CreateCategory',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * @param requestBody
     * @returns CreateCategoryFeaturesResponse Success
     * @throws ApiError
     */
    public static postAdminPanelCreateCategoryFeatures(
        requestBody?: CreateCategoryFeaturesCommand,
    ): CancelablePromise<CreateCategoryFeaturesResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/AdminPanel/CreateCategoryFeatures',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * @param requestBody
     * @returns Product Success
     * @throws ApiError
     */
    public static postAdminPanelCreateProduct(
        requestBody?: CreateProductCommand,
    ): CancelablePromise<Product> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/AdminPanel/CreateProduct',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * @param id
     * @returns string Success
     * @throws ApiError
     */
    public static deleteAdminPanelDeleteProduct(
        id: number,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/AdminPanel/DeleteProduct/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @returns string Success
     * @throws ApiError
     */
    public static deleteAdminPanelDeleteCategory(
        id: number,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/AdminPanel/DeleteCategory/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @returns string Success
     * @throws ApiError
     */
    public static deleteAdminPanelDeleteFeature(
        id: number,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/AdminPanel/DeleteFeature/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Редактирование продукта
     * @param requestBody
     * @returns string Success
     * @throws ApiError
     */
    public static putAdminPanelEditProduct(
        requestBody?: EditProductCommand,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/AdminPanel/EditProduct',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * @param requestBody
     * @returns number Success
     * @throws ApiError
     */
    public static putAdminPanelEditCategory(
        requestBody?: EditCategoryCommand,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/AdminPanel/EditCategory',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * Сброс данных
     * @returns string Success
     * @throws ApiError
     */
    public static postAdminPanelSeedDatabase(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/AdminPanel/SeedDatabase',
        });
    }

}
