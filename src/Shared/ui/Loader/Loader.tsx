import { Skeleton, VStack } from "@chakra-ui/react"
import { v4 } from "uuid"

export const Loader = () => {
	return (
		<VStack gap={5} mt={3}>
			<Skeleton w={"full"}>Header</Skeleton>
			{new Array(10).fill("").map(el => (
				<Skeleton key={v4()} w={"full"} h={39}>
          Row
				</Skeleton>
			))}
		</VStack>
	)
}
