import { $privateRoutes } from "./Providers/Router"
import { ChakraProvider } from "@chakra-ui/react"
import { useRoutes } from "react-router-dom"
import { Notifications } from "./Providers/Notifications"

export const App = () => {
  
  const privateRoutes = useRoutes($privateRoutes)
  
  return <ChakraProvider>
    {privateRoutes}
    <Notifications />
  </ChakraProvider>
}
