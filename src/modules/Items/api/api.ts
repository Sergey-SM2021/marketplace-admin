export const api = {
  getProducts() {
    return "http://shopshop.somee.com/Shop/GetProducts"
  },
  createProduct(){
    return "http://shopshop.somee.com/AdminPanel/CreateProduct" 
  },
  removeProduct(id: number){
    return `http://shopshop.somee.com/AdminPanel/DeleteProduct/${id}`
  },
}
