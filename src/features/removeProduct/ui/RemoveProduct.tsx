import { product } from "Entity/Products"

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

interface IRemoveProduct {
  isOpen: boolean

  onClose: () => void
  
  productId: number
}

export const RemoveProduct = ({
	isOpen,
	onClose,
	productId,
}: IRemoveProduct) => {
  
	const ref = useRef(null)
  
	const handlerRemove = () => {
		product.model.removeProduct(productId)
		onClose()
	}

	return (
		<AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={ref}>
			<AlertDialogOverlay />
			<AlertDialogContent>
				<AlertDialogHeader>Удалить продукт</AlertDialogHeader>
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
