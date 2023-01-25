export const api = {
  getCategories: "http://shopshop.somee.com/Shop/GetCategoriesTree",
  createCategory: "http://shopshop.somee.com/AdminPanel/CreateCategory",
  removeCategory: (id: number) =>
    `http://shopshop.somee.com/AdminPanel/DeleteCategory/${id}`,
}
