import axios from "axios"

const instance = axios.create({
  baseURL: "http://shopyshopy-001-site1.atempurl.com/",
})

export const getParamsByCategory = async (id: number) => {
  return (await instance.get(`Shop/GetFeaturesByCategory/${id}`)).data
}

export const getParams = async () => {
  return (await instance.get("Shop/GetFeatures")).data
}

export const createParam = async (name: string) =>
  (
    await instance.post("AdminPanel/CreateFeature", {
      name,
    })
  ).data
