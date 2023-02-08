import { RouterProvider, createBrowserRouter } from "react-router-dom"
import ReactDOM from "react-dom/client"
import "./index.css"
// import { StrictMode } from "react"
import { App } from "./App/App"
import reportWebVitals from "./reportWebVitals"
import { ErrorPage } from "./pages/ErrorPage"
import { CategoriesPage } from "pages/Categories"
import { ProductsPage } from "pages/Products"
import { ItemsPage } from "pages/Items"
import { SignIn } from "modules/SignIn/SignIn"
import { SignInPage } from "pages/SignIn"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/categories",
        element: <CategoriesPage />,
      },
      {
        path: "/categories/:categoryId",
        element: <ItemsPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/profile",
        element:<div>profile</div>
      },
      {
        path: "/",
        element:<SignInPage />
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  // <StrictMode>
    <RouterProvider router={router} />
  // </StrictMode>
)

reportWebVitals()
