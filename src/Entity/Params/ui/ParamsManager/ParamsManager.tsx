import { useParams } from "Entity/Params/hooks/useParams"
import { createParam, removeParam } from "Entity/Params/store/params"

import {
	Box,
	Button,
	CloseButton,
	Grid,
	HStack,
	Input,
	Tag,
	TagCloseButton,
	TagLabel,
	VStack,
} from "@chakra-ui/react"
import { type Feature } from "Shared/types"
import { type FormEvent, useState } from "react"

export const ParamsManager = () => {
	const [currentParam, setCurrentParam] = useState<Feature | undefined>()

	const params = useParams()

	const [paramName, setParamName] = useState<string>("")

	const filterFeatures = (e: FormEvent<HTMLInputElement>) => {
		setParamName(e.currentTarget.value)
	}

	const handlerCreateParam = async () => {
		await createParam(paramName)
		setParamName("")
	}

	const handlerClear = () => {
		setParamName("")
	}

	const handlerRemoveParam = (id:number) => {
		removeParam(id)
	}

	return (
		<VStack bg={"white"} mt={"1em"} mb={"1em"} p={3} borderRadius={5}>
			<HStack>
				<CloseButton onClick={handlerClear}/>
				<Input value={paramName} onChange={filterFeatures} />
				<Button onClick={handlerCreateParam}>add</Button>
			</HStack>
			<Grid
				templateColumns="repeat(auto-fill, minmax(100px, 1fr))"
				w={"full"}
				gap={6}>
				{params.map(p => (
					<Box key={p.id}>
						<Tag
							size={"lg"}
							_hover={{ cursor: "grab" }}
							draggable
							onDragStart={() => {
								setCurrentParam(p)
							}}>
							<TagLabel>{p.name}</TagLabel>
							<TagCloseButton onClick={() => handlerRemoveParam(p.id as number)}/>
						</Tag>
					</Box>
				))}
			</Grid>
		</VStack>
	)
}
