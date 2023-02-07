import { $ProductsPageStore, getProducts } from "./store"

import { Items } from "modules/Items"

import { useStore } from "effector-react"
import { useEffect } from "react"

export const ProductsPage = () => {
  const products = useStore($ProductsPageStore)

  console.log(products)

  useEffect(() => {
    getProducts()
  }, [])
  return (
    <div>
      <Items initProducts={products} />
    </div>
  )
}
