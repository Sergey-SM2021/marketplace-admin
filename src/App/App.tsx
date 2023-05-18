import { RoutesProvider } from "./Providers/Router"

import { ChakraProvider } from "@chakra-ui/react"
import { Suspense } from "react"

export const App = () => {
	return (
		<ChakraProvider>
			<Suspense>
				<RoutesProvider />
			</Suspense>
		</ChakraProvider>
	)
}
