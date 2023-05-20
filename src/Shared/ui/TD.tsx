import { Td, Th, chakra } from "@chakra-ui/react"

export const TH = chakra(Th, {
	baseStyle: {
		background: "#96f",
		color: "#fff",
		_first: { borderRadius: "10px 0 0 10px" },
		_last: { borderRadius: "0 10px 10px 0" },
	},
})

export const TD = chakra(Td, {
	baseStyle: {
		background: "#fff",
		color: "#000",
		_first: { borderRadius: "10px 0 0 10px" },
		_last: { borderRadius: "0 10px 10px 0" },
	},
})
