import { CategoriesPage } from "pages/Categories"
import { NotFound } from "pages/NotFound"
import { ProductPage } from "pages/ProductPage"
import { ProductsPage } from "pages/Products"

import { Flex } from "@chakra-ui/layout"
import { Outlet, createBrowserRouter } from "react-router-dom"
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
				path: "/products",
				element: <ProductsPage />,
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
])
