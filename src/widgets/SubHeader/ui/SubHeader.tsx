import { Flex, Text } from "@chakra-ui/react"
import { ReactComponent as ThemeIcon } from "Shared/assets/dark_mode_FILL0_wght400_GRAD0_opsz48.svg"
import { ReactComponent as Expand } from "Shared/assets/expand_more_FILL0_wght400_GRAD0_opsz48.svg"

export const SubHeader = () => {
	return (
		<Flex p={3} align={"center"} gap={5}>
			<ThemeIcon height={"30px"} width={"30px"} />
			<Flex align={"center"}>
				<Text>Русский</Text>
				<Expand width={"30px"} height={"30px"} />
			</Flex>
		</Flex>
	)
}
