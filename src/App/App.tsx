import { Notifications } from "./Providers/Notifications"
import { RoutesProvider } from "./Providers/Router"
import "./Style/index.css"

import { ChakraProvider } from "@chakra-ui/react"
import { Suspense } from "react"

export const App = () => {
	return (
		<ChakraProvider>
			<Suspense>
				<RoutesProvider />
			</Suspense>
			<Notifications />
		</ChakraProvider>
	)
}
