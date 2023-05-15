import axios from "axios"

const instance = axios.create({
  baseURL: "http://shopyshopy-001-site1.atempurl.com/",
})

export const getCategories = async () => {
  return (await instance.get("Shop/GetCategories")).data
}

