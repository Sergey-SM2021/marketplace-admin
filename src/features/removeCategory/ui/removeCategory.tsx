import { removeCategoryById } from "Entity/CategoriesTree/store/CategoriesTree"

import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
} from "@chakra-ui/react"
import { useRef } from "react"

interface IRemoveCategory {
  isOpen: boolean

  onClose: () => void

  categoryId: number
}

export const RemoveCategory = ({
	isOpen,
	onClose,
	categoryId,
}: IRemoveCategory) => {
	const ref = useRef(null)

	const handlerRemove = () => {
		removeCategoryById(categoryId)
		onClose()
	}

	return (
		<AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={ref}>
			<AlertDialogOverlay />
			<AlertDialogContent>
				<AlertDialogHeader>Удалить категорию</AlertDialogHeader>
				<AlertDialogBody>
          Are you sure? You undo this action afterwards.
				</AlertDialogBody>
				<AlertDialogFooter>
					<Button colorScheme="purple" ref={ref} onClick={onClose}>
            Отменить
					</Button>
					<Button onClick={handlerRemove} colorScheme="red" ml={3}>
            Удалить
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
