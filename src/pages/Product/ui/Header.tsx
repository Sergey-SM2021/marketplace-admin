import { Button, Heading } from "@chakra-ui/react"
import { type FC } from "react"
import { useNavigate } from "react-router-dom"

interface IHeader {
  productName: string
}

export const Header: FC<IHeader> = ({ productName }) => {
	const nav = useNavigate()
	const handlerBack = () => {
		nav(-1)
	}
	return (
		<div className="flex gap-4 items-end mb-4">
			<Button onClick={handlerBack}>back</Button>
			<div>
				<Heading>{productName}</Heading>
			</div>
		</div>
	)
}
