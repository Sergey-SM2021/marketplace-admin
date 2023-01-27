import { RouterProvider, createBrowserRouter } from "react-router-dom"
import ReactDOM from "react-dom/client"
import "./index.css"
// import { StrictMode } from "react"
import { App } from "./App/App"
import reportWebVitals from "./reportWebVitals"
import { ErrorPage } from "./pages/ErrorPage"
import { CategoriesPage } from "pages/Categories"
import { Items } from "modules/Items"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <CategoriesPage />,
      },
      {
        path: "/categories/:categoryId",
        element: <Items />,
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
