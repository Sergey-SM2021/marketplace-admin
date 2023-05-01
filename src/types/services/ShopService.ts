/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryResponseDTO } from '../models/CategoryResponseDTO';
import type { CategoryResponseTreeDTO } from '../models/CategoryResponseTreeDTO';
import type { Feature } from '../models/Feature';
import type { ProductResponseDTO } from '../models/ProductResponseDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ShopService {

    /**
     * Получить список всех продуктов
     * @returns ProductResponseDTO Success
     * @throws ApiError
     */
    public static getShopGetProducts(): CancelablePromise<Array<ProductResponseDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Shop/GetProducts',
        });
    }

    /**
     * Получить конкретный продукт
     * @param id
     * @returns ProductResponseDTO Success
     * @throws ApiError
     */
    public static getShopGetProductById(
        id?: number,
    ): CancelablePromise<ProductResponseDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Shop/GetProductById',
            query: {
                'Id': id,
            },
        });
    }

    /**
     * Получить список всех атрибутов
     * @returns Feature Success
     * @throws ApiError
     */
    public static getShopGetFeatures(): CancelablePromise<Array<Feature>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Shop/GetFeatures',
        });
    }

    /**
     * Получить список категорий в виде дерева
     * @returns CategoryResponseTreeDTO Success
     * @throws ApiError
     */
    public static getShopGetCategoriesTree(): CancelablePromise<Array<CategoryResponseTreeDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Shop/GetCategoriesTree',
        });
    }

    /**
     * Получить список категорий
     * @returns CategoryResponseDTO Success
     * @throws ApiError
     */
    public static getShopGetCategories(): CancelablePromise<Array<CategoryResponseDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Shop/GetCategories',
        });
    }

    /**
     * Получить список атрибутов конкретной категории
     * @param id
     * @returns Feature Success
     * @throws ApiError
     */
    public static getShopGetFeaturesByCategory(
        id: number,
    ): CancelablePromise<Array<Feature>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Shop/GetFeaturesByCategory/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Получить список продуктов конкретной категории
     * @param id
     * @returns ProductResponseDTO Success
     * @throws ApiError
     */
    public static getShopGetProductsByCategory(
        id: number,
    ): CancelablePromise<Array<ProductResponseDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Shop/GetProductsByCategory/{id}',
            path: {
                'id': id,
            },
        });
    }

}