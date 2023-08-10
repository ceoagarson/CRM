import { apiClient } from "./utils/AxiosInterceptor"


export const GetLeads = async ({ limit, page }: { limit: number | undefined, page: number | undefined }) => {
  return await apiClient.get(`leads?limit=${limit}&page=${page}`)
}

export const GetCustomers = async () => {
  return await apiClient.get(`customers`)
}


export const NewLead = async (body: FormData) => {
  return await apiClient.post("leads", body)
}
export const UpdateLead = async ({ id, body }: { id: string, body: FormData }) => {
  return await apiClient.put(`leads/${id}`, body)
}
export const DeleteLead = async ({ id }: { id: string }) => {
  return await apiClient.delete(`leads/${id}`)
}
export const ConvertCustomer = async ({ id }: { id: string }) => {
  return await apiClient.patch(`leads/${id}`)
}
export const BulkLeadUpdateFromExcel = async (body: FormData) => {
  return await apiClient.put(`/update/leads/bulk`, body)
}

export const NewRemark = async ({ id, remark }: { id: string, remark: string }) => {
  return await apiClient.patch(`remarks/leads/${id}`, { remark: remark })
}
