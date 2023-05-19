import { Button, Center, Heading, VStack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

export const NotFound = () => {
	const nav = useNavigate()
	const onBack = () => {
		nav(-1)
	}
	return (
		<Center w={"100%"} h={"100%"} bg={"whatsapp.100"}>
			<VStack>
				<Heading>page not found</Heading>
				<Button onClick={onBack}>Back</Button>
			</VStack>
		</Center>
	)
}
