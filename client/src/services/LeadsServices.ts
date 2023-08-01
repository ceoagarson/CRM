import { TformData } from "../components/forms/lead/UpdateLeadForm"
import { apiClient } from "./utils/AxiosInterceptor"


export const GetLeads = async () => {
  return await apiClient.get(`leads`)
}
export const NewLead = async (body: TformData) => {
  return await apiClient.post("leads", body)
}
export const UpdateLead = async ({ id, body }: { id: string, body: TformData }) => {
  return await apiClient.put(`leads/${id}`, body)
}
export const DeleteLead = async ({ id }: { id: string }) => {
  return await apiClient.delete(`leads/${id}`)
}
export const PreserveLead = async ({ id }: { id: string }) => {
  return await apiClient.patch(`leads/${id}`)
}
export const NewRemark = async ({ id, remark }: { id: string, remark: string }) => {
  return await apiClient.patch(`remarks/leads/${id}`, { remark: remark })
}
