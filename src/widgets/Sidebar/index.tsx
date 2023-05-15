import { ReactComponent as Burger } from "assets/burger.svg"
import { memo, useState } from "react"
import { FilterByRegularName } from "./components/SearchByProductName"
import { FilterByPrice } from "./components/FilterByPrice"
import { Button } from "@chakra-ui/react"

export const Sidebar = memo(() => {
	const [isOpen, setIsOpen] = useState(true)

	const handlerBurgerClick = () => {
		setIsOpen(prev => !prev)
	}

	return (
		<div>
			<div
				className="h-16 bg-black flex items-center justify-center hover:cursor-pointer transition hover:bg-opacity-90"
				onClick={handlerBurgerClick}>
				<Burger className="fill-white" />
			</div>
			{isOpen && (
				<div className="p-4 bg-white h-full w-80 flex flex-col gap-4">
					<div className="flex-auto flex flex-col gap-4">
						<FilterByRegularName />
						<FilterByPrice />
						<div>attributes</div>
					</div>
					<Button>filter</Button>
				</div>
			)}
		</div>
	)
})

Sidebar.displayName = "Sidebar"