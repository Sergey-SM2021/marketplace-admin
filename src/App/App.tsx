import {$privateRoutes} from "./app.data"
import {ChakraProvider} from '@chakra-ui/react'
import {useRoutes} from "react-router-dom"

export const App = () => {
    const privateRoutes = useRoutes($privateRoutes)
    return <ChakraProvider>{privateRoutes}</ChakraProvider>
}
