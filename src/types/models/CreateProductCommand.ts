/* istanbul ignore file */
/* eslint-disable */

export type CreateProductCommand = {
  name?: string | null
  categoryId?: number | null
  info?: string | null
  price?: number
  count?: number
  featureValue?: Record<string, string | null> | null
}
