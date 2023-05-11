import { navLinks } from "./Header.data"

import { Box, Button, Flex, HStack, Spacer } from "@chakra-ui/react"
import { ReactComponent as Shop } from "Shared/assets/goShop.svg"
import { ReactComponent as Profile } from "Shared/assets/profile0.svg"
import { memo } from "react"
import { Link } from "react-router-dom"

export const Header = memo(() => {
  return (
    <Box p={3} background={"facebook.900"}>
      <Flex>
        <HStack>
          <Link to="/admin/profile">
            <Profile className="fill-white" />
          </Link>
          <Link to="/">
            <Shop className="fill-white" />
          </Link>
        </HStack>
        <Spacer />
        <HStack className="flex gap-4">
          {navLinks.map(item => (
            <Link to={item.link} key={item.id}>
              <Button leftIcon={item.icon} colorScheme="purple">
                {item.text}
              </Button>
            </Link>
          ))}
        </HStack>
      </Flex>
    </Box>
  )
})
