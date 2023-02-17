import { $ProductsPageStore, getProducts } from "./store"

import { Items } from "admin/modules/Items"

import { useStore } from "effector-react"
import { useEffect } from "react"
import { Product } from "admin/modules/Product"

export const ProductsPage = () => {
  const products = useStore($ProductsPageStore)

  useEffect(() => {
    getProducts()
  }, [])
  return (
    <div className="flex">
      <Items initProducts={products} />
      <Product />
    </div>
  )
}
