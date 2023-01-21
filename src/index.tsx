import { RouterProvider, createBrowserRouter } from "react-router-dom"
import ReactDOM from "react-dom/client"
import "./index.css"
import { StrictMode } from "react"
import { App } from "./pages/App"
import reportWebVitals from "./reportWebVitals"
import { ErrorPage } from "./components/ErrorPage"
import { Categories } from "pages/Categories"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Categories />,
      },
      {
        path: "/categories",
        element: <div>items</div>,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

reportWebVitals()
