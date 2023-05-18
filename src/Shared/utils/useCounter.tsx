import { useState } from "react"

export const useCounter = (defaultValue = 1) => {
	const [count, setCount] = useState(defaultValue)

	const increment = () => {
		setCount(prev => prev + 1)
	}

	const decrement = () => {
		setCount(prev => prev - 1)
	}
	return {
		decrement,
		increment,
		count,
	}
}
