import { EditCategoryCommand } from "entity/models/EditCategoryCommand"

import { SyntheticEvent } from "react"

export interface IHandlerEdit {
  id: number
  name: string
  parentCategoryId: number
}

export interface IHanleModalOpen {
  e?: SyntheticEvent
  state?: EditCategoryCommand
}