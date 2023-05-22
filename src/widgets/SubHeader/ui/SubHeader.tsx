import {
	Box,
	Button,
	Flex,
	Popover,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	Stack,
	Text,
	useDisclosure,
} from "@chakra-ui/react"
import { ReactComponent as ThemeIcon } from "Shared/assets/dark_mode_FILL0_wght400_GRAD0_opsz48.svg"
import { ReactComponent as Expand } from "Shared/assets/expand_more_FILL0_wght400_GRAD0_opsz48.svg"
import { useTranslation } from "react-i18next"

export const SubHeader = () => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const { i18n } = useTranslation()

	const changeLanguage = (lang: string) => {
		i18n.changeLanguage(lang)
	}

	return (
		<Flex p={3} align={"center"} gap={5}>
			<ThemeIcon height={"30px"} width={"30px"} />
			<Popover isOpen={isOpen} onClose={onClose} placement="bottom">
				<PopoverTrigger>
					<Button onClick={onOpen}>
						<Text>{i18n.language}</Text>
						<Expand width={"30px"} height={"30px"} />
					</Button>
				</PopoverTrigger>
				<PopoverContent w={150}>
					<PopoverBody>
						<Stack>
							<Box onClick={()=>changeLanguage("Русский")}>Русский</Box>
							<Box onClick={()=>changeLanguage("English")}>English</Box>
						</Stack>
					</PopoverBody>
				</PopoverContent>
			</Popover>
		</Flex>
	)
}
