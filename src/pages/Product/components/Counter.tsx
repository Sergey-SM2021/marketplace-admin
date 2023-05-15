import { Button } from "@chakra-ui/react"

export const Counter = () => {
	return (
		<div className="flex mb-10">
			<Button>+</Button>
			<div>10 штук в наличии</div>
			<Button>-</Button>
		</div>
	)
}
