import axios from "axios"

const instance = axios.create({
  baseURL: "http://jenya123-001-site1.dtempurl.com/",
})

export const getCategories = async () => {
  return (await instance.get("Shop/GetCategories")).data
}

