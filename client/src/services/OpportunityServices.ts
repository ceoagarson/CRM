import { apiClient } from "../utils/AxiosInterceptor"

export const GetOpportunity = async (id: string) => {
  return await apiClient.get(`opportunities/${id}`)
}
export const DeleteOpportunity = async (id: string) => {
  return await apiClient.delete(`opportunities/${id}`)
}
export const GetOpportunitys = async () => {
  return await apiClient.get(`opportunities`)
}
export const NewOpportunity = async (body: FormData) => {
  return await apiClient.post("opportunities",body)
}
export const UpdateOpportunity = async ({ id, body }: { id: string, body: FormData }) => {
  return await apiClient.put(`opportunities/${id}`,body)
}
export const ToogleOpportunityStatus = async (id: string) => {
  return await apiClient.patch(`opportunities/${id}`)

}