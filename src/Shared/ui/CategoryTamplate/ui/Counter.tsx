import { Button, HStack, Input } from "@chakra-ui/react"

interface CounterProps {
  count: number | string
  onIncrement: () => void
  onDecrement: () => void
}

export const Counter = ({ count, onDecrement, onIncrement }: CounterProps) => {
	return (
		<HStack>
			<Input width="auto" htmlSize={2} value={count} />
			<Button onClick={onIncrement} colorScheme={"red"}>
        +
			</Button>
			<Button
				isDisabled={count === 0}
				onClick={onDecrement}
				colorScheme={"blue"}>
        -
			</Button>
		</HStack>
	)
}
