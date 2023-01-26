export const api = {
  getProducts: "http://shopshop.somee.com/Shop/GetProducts",
  createProduct: "http://shopshop.somee.com/AdminPanel/CreateProduct",
  removeProduct: (id: number) =>
    `http://shopshop.somee.com/AdminPanel/DeleteProduct/${id}`,
}
