/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryResponse } from '../models/CategoryResponse';
import type { ChangeCountProductCommand } from '../models/ChangeCountProductCommand';
import type { CreateCategoryCommand } from '../models/CreateCategoryCommand';
import type { CreateCategoryFeaturesCommand } from '../models/CreateCategoryFeaturesCommand';
import type { CreateProductCommand } from '../models/CreateProductCommand';
import type { EditCategoryCommand } from '../models/EditCategoryCommand';
import type { EditFeatureCommand } from '../models/EditFeatureCommand';
import type { EditProductCommand } from '../models/EditProductCommand';
import type { FeaturesResponse } from '../models/FeaturesResponse';
import type { ProductResponse } from '../models/ProductResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AdminPanelService {

    /**
     * Создать категорию
     * @param requestBody
     * @returns CategoryResponse Success
     * @throws ApiError
     */
    public static postAdminPanelCreateCategory(
        requestBody?: CreateCategoryCommand,
    ): CancelablePromise<CategoryResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/AdminPanel/CreateCategory',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * Создать атрибут категории
     * @param requestBody
     * @returns FeaturesResponse Success
     * @throws ApiError
     */
    public static postAdminPanelCreateCategoryFeatures(
        requestBody?: CreateCategoryFeaturesCommand,
    ): CancelablePromise<FeaturesResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/AdminPanel/CreateCategoryFeatures',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * Создать продукт
     * @param requestBody
     * @returns ProductResponse Success
     * @throws ApiError
     */
    public static postAdminPanelCreateProduct(
        requestBody?: CreateProductCommand,
    ): CancelablePromise<ProductResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/AdminPanel/CreateProduct',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * Удалить продукт
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
     * Удалить категорию
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
     * Удалить атрибут
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
     * @returns ProductResponse Success
     * @throws ApiError
     */
    public static putAdminPanelEditProduct(
        requestBody?: EditProductCommand,
    ): CancelablePromise<ProductResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/AdminPanel/EditProduct',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * Редактирование категории
     * @param requestBody
     * @returns CategoryResponse Success
     * @throws ApiError
     */
    public static putAdminPanelEditCategory(
        requestBody?: EditCategoryCommand,
    ): CancelablePromise<CategoryResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/AdminPanel/EditCategory',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * Редактирование атрибута
     * @param requestBody
     * @returns FeaturesResponse Success
     * @throws ApiError
     */
    public static putAdminPanelEditFeature(
        requestBody?: EditFeatureCommand,
    ): CancelablePromise<FeaturesResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/AdminPanel/EditFeature',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * Изменить кол-во товара
     * @param requestBody
     * @returns ProductResponse Success
     * @throws ApiError
     */
    public static putAdminPanelChangeCountProduct(
        requestBody?: ChangeCountProductCommand,
    ): CancelablePromise<ProductResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/AdminPanel/ChangeCountProduct',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

}
