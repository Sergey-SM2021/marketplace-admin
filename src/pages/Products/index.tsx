import { Items } from "modules/Items"

import { useStore } from "effector-react"
import { useEffect } from "react"
import { $products, getProducts } from "Entity/Products/model/model"

export const ProductsPage = () => {
  const products = useStore($products)
  useEffect(() => {
    getProducts()
  }, [])
  return (
    <div className="flex">
      <Items initProducts={products} />
    </div>
  )
}
