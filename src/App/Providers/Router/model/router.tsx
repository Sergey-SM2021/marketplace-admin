import { CategoriesPage } from "pages/Categories"
import { NotFound } from "pages/NotFound"
import { ProductPage } from "pages/ProductPage"
import { ProductsPage } from "pages/Products"

import { Flex } from "@chakra-ui/layout"
import { Outlet, createBrowserRouter } from "react-router-dom"
import { Footer } from "widgets/Footer/Footer"
import { Header } from "widgets/Header"
import { SubHeader } from "widgets/SubHeader"

export const routes = createBrowserRouter([
	{
		path: "/",
		element: (
			<Flex flexDirection={"column"} minH={"100vh"} h={"full"} bg={"gray.300"} w={"full"}>
				<SubHeader />
				<Header></Header>
				<Outlet />
				<Footer />
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
