import { Notifications } from "./Providers/Notifications"
import { RoutesProvider } from "./Providers/Router"
import "./Style/index.css"

import { ChakraProvider } from "@chakra-ui/react"

export const App = () => {
  return (
    <ChakraProvider>
      <RoutesProvider />
      <Notifications />
    </ChakraProvider>
  )
}
