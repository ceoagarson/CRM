import { apiClient } from "../utils/AxiosInterceptor"

export type Resource_Type = "lead" | "account" | "opportunity"
export type Activity_Type = "visited" | "telephonic" | ""

export const GetActivity = async (id: string) => {
  return await apiClient.get(`activities/${id}`)
}
export const DeleteActivity = async (id: string) => {
  return await apiClient.delete(`activities/${id}`)
}
export const GetActivities = async () => {
  return await apiClient.get(`activities`)
}
export const NewActivity = async ({ id, body }: {
  id: string, body: {
    activity_type: Activity_Type,
    description: string,
    remarks: string,
    resource_type: Resource_Type
  }
}) => {
  return await apiClient.post(`activities/${id}`, body)
}

export const UpdateActivity = async ({ id, body }: {
  id: string, body: {
    activity_type: string,
    description: string,
    remarks: string
  }
}) => {
  return await apiClient.put(`activities/${id}`, body)
}
export const ToogleActivityStatus = async (id: string) => {
  return await apiClient.patch(`activities/${id}`)

}