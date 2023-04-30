import axios from "axios"

const instance = axios.create({
  baseURL: "http://jenya123-001-site1.dtempurl.com/",
})

export const getParamsByCategory = async (id: number) => {
  return (await instance.get(`Shop/GetFeaturesByCategory/${id}`)).data
}
