import { Button, HStack, Input } from "@chakra-ui/react"

interface CounterProps {
  count: number | string
}

export const Counter = ({ count }: CounterProps) => {
	return (
		<HStack>
			<Input width="auto" htmlSize={2} value={count} />
			<Button colorScheme={"red"}>+</Button>
			<Button colorScheme={"blue"}>-</Button>
		</HStack>
	)
}
