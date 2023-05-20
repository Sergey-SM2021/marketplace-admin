import { Center, Spinner } from "@chakra-ui/react"

export const Pending = () => {
	return (
		<Center
			h={"100vh"}
			w={"full"}
			sx={{ position: "absolute", background: "rgba(0,0,0,.1)" }}>
			<Spinner
				thickness="4px"
				speed="0.65s"
				emptyColor="gray.200"
				color="blue.500"
				size="xl"
			/>
		</Center>
	)
}
