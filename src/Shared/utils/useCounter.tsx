import { useState } from "react"

export const useCounter = () => {
	const [count, setCount] = useState(0)
	const add = () => {
		setCount(prev => prev - 1)
	}
	const remove = () => {
		setCount(prev => prev + 1)
	}
	return {
		remove,
		add,
		count,
	}
}
