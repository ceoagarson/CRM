import { apiClient } from "./utils/AxiosInterceptor"


export const GetMachines = async () => {
    return await apiClient.get(`machines`)
}
export const NewMachine = async (body: { name: string, category: string }) => {
    return await apiClient.post(`machines`, body)
}
export const UpdateMachine = async ({ id, body }: { id: string, body: { name: string, category: string } }) => {
    return await apiClient.put(`machines/${id}`, body)
}
