import { RoutesProvider } from "./Providers/Router"

import { ChakraProvider } from "@chakra-ui/react"
import { Suspense } from "react"

import "./config/i18n"

export const App = () => {
	return (
		<ChakraProvider>
			<Suspense>
				<RoutesProvider />
			</Suspense>
		</ChakraProvider>
	)
}
