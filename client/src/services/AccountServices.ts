import { apiClient } from "../utils/AxiosInterceptor"

export const GetAccount = async (id: string) => {
  return await apiClient.get(`accounts/${id}`)
}

export const GetAccounts = async () => {
  return await apiClient.get(`accounts`)
}
export const NewAccount = async (body: FormData) => {
  return await apiClient.post("accounts",body)
}
export const UpdateAccount = async ({ id, body }: { id: string, body: FormData }) => {
  return await apiClient.put(`accounts/${id}`,body)
}
export const ToogleAccountStatus = async (id: string) => {
  return await apiClient.patch(`accounts/${id}`)
}