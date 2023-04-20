import { apiClient } from "./utils/AxiosInterceptor"

export const GetMachine = async (id: string) => {
    return await apiClient.get(`machines/${id}`)
}

export const GetMachines = async () => {
    return await apiClient.get(`machines`)
}
export const NewMachine = async (body: { name: string, category: string }) => {
    return await apiClient.post(`machines`, body)
}
export const UpdateMachine = async ({ id, body }: { id: string, body: { machine: string, category: string } }) => {
    return await apiClient.put(`machines/${id}`, body)
}
