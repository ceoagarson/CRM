import { apiClient } from "../utils/AxiosInterceptor"

export const GetLead = async (id: string) => {
  return await apiClient.get(`leads/${id}`)
}

export const GetLeads = async () => {
  return await apiClient.get(`leads`)
}
export const NewLead = async (body: FormData) => {
  return await apiClient.post("leads", body)
}
export const UpdateLead = async ({ id, body }: { id: string, body: FormData }) => {
  return await apiClient.put(`leads/${id}`, body)
}
export const NewRemark = async ({ id, remark }: { id: string, remark: string }) => {
  return await apiClient.patch(`leads/${id}`, { remark: remark })
}
