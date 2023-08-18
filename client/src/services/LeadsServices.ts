import { apiClient } from "./utils/AxiosInterceptor"


export const GetLeads = async ({ limit, page }: { limit: number | undefined, page: number | undefined }) => {
  return await apiClient.get(`leads?limit=${limit}&page=${page}`)
}



export const FuzzySearchLeads = async (searchString?: string) => {
  return await apiClient.get(`search/leads?key=${searchString}`)
}
export const FuzzySearchCustomers = async (searchString?: string) => {
  return await apiClient.get(`search/customers?key=${searchString}`)
}
export const BackupAllLeads = async () => {
  return await apiClient.get("/backup/leads")
}
export const GetCustomers = async ({ limit, page }: { limit: number | undefined, page: number | undefined }) => {
  return await apiClient.get(`customers?limit=${limit}&page=${page}`)
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
export const UpdateLeadFieldsUpdatable = async (
  body: {
    stages: string[],
    lead_types: string[],
    lead_sources: string[],
  }
) => {
  return await apiClient.put(`fields/lead/update`, body)
}
export const GetLeadFieldsUpdatable = async () => {
  return await apiClient.get(`lead-updatable-fields`)
}


