import axios from "axios";
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL

let BaseURL = "/api/v1/"
if (VITE_SERVER_URL)
  BaseURL = VITE_SERVER_URL + BaseURL

const apiClient = axios.create({
  baseURL: BaseURL,
  withCredentials: true
})


export {
  BaseURL,
  apiClient
}