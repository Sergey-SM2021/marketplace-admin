import { Modal } from "Entity/Products/ui/Modal"

import { type FC } from "react"

interface ICreateProduct {
  isOpen: boolean
  onClose: () => void
}

export const CreateProduct: FC<ICreateProduct> = ({ onClose, isOpen }) => {
	return <Modal isOpen={isOpen} onClose={onClose} />
}
