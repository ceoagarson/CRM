import { apiClient } from "./utils/AxiosInterceptor"

export const GetProduction = async (id: string) => {
    return await apiClient.get(`productions/${id}`)
}

export const GetProductions = async () => {
    return await apiClient.get(`productions`)
}
export const NewProduction = async (body: {
    machine_id: string, production: number, created_at:Date
}) => {
    return await apiClient.post(`productions/${body.machine_id}`, body)
}

