import { routes } from "../model/router"

import { RouterProvider } from "react-router-dom"

export const RoutesProvider = () => {
	return <RouterProvider router={routes} />
}
