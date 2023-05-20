import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
} from "@chakra-ui/react"
import { FC, PropsWithChildren } from "react"

export const DisplayError: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Alert status="error" position={"absolute"}>
			<AlertIcon />
			{children}
		</Alert>
	)
}
