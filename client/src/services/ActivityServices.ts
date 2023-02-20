import { apiClient } from "../utils/AxiosInterceptor"

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
    type: string,
    description: string,
    remarks: string,
    resource_type: string
  }
}) => {
  return await apiClient.post(`activities/:${id}`, body)
}

export const UpdateActivity = async ({ id, body }: {
  id: string, body: {
    type: string,
    description: string,
    remarks: string
  }
}) => {
  return await apiClient.put(`activities/${id}`, body)
}
export const ToogleActivityStatus = async (id: string) => {
  return await apiClient.patch(`activities/${id}`)

}