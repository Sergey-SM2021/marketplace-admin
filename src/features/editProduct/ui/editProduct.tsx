import { Modal } from "Entity/Products/ui/Modal"

import { type FC } from "react"

interface ICreateNewItem {
  isOpen: boolean
  onClose: () => void
}

export const EditProduct: FC<ICreateNewItem> = ({ onClose, isOpen }) => {
  return <Modal action="edit" isOpen={isOpen} onClose={onClose} />
}
