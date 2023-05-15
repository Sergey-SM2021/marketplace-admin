import { type FeaturesResponse } from "types"

import axios from "axios"

const instance = axios.create({
	baseURL: "http://shopyshopy-001-site1.atempurl.com/",
})

export const getParamsByCategory = async (id: number) =>
	(await instance.get(`Shop/GetFeaturesByCategory/${id}`)).data

export const getParams = async () =>
	(await instance.get("Shop/GetFeatures")).data

export const createParam = async (name: string) =>
	(
		await instance.post<FeaturesResponse>("AdminPanel/CreateFeature", {
			name,
		})
	).data.feature

export const removeParam = async (id: number) =>
	(await instance.delete<string>(`AdminPanel/DeleteFeature/${id}`)).data
