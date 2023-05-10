import { Flex } from "@chakra-ui/react"
import { type FC, type PropsWithChildren } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "widgets/Header"

interface ILayout extends PropsWithChildren {}

export const Layout: FC<ILayout> = () => {
  return (
    <Flex flexDirection={"column"} h={"100vh"} bg={"gray.300"} w={"full"}>
      <Header></Header>
      <Outlet />
    </Flex>
  )
}
