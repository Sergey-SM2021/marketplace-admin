import { CategoriesPage } from "pages/Categories"
import { ProductPage } from "pages/ProductPage"
import { ProductsPage } from "pages/Products"

import { Navigate, Outlet, createBrowserRouter } from "react-router-dom"
import { Flex } from "@chakra-ui/layout"
import { Header } from "widgets/Header"

export const routes = createBrowserRouter([
	{
		path: "/",
		element: (
			<Flex flexDirection={"column"} h={"100vh"} bg={"gray.300"} w={"full"}>
				<Header></Header>
				<Outlet />
			</Flex>
		),
		children: [
			{
				path: "/",
				element: <CategoriesPage />,
			},
			{
				path: "/product/:id",
				element: <ProductPage />,
			},
			{
				path: "/admin/products",
				element: <ProductsPage />,
			},
			{
				path: "/admin/products/:id",
				element: <ProductsPage />,
			},
			{
				path: "/admin/profile",
				element: <div>profile</div>,
			},
			{
				path: "/admin/*",
				element: <Navigate to={"/"} />,
			},
			{
				path: "/admin/notifications-list",
				element: <div>/admin/notifications-list</div>,
			},
		],
	},
	{
		path: "*",
		element: <div>error</div>,
	},
])
