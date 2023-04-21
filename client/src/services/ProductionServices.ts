import { apiClient } from "./utils/AxiosInterceptor"


export const GetProduction = async (id: string) => {
    return await apiClient.get(`productions/${id}`)
}

export const GetProductions = async () => {
    return await apiClient.get(`productions`)
}
export const NewProduction = async (body: {
    machine_id: string, production: string, created_at:Date
}) => {
    return await apiClient.post(`productions/${body.machine_id}`, body)
}

export const GetProductionByDate = async (date?: string) => {
    return await apiClient.get(`/bydate/productions/?date=${date}`)
}
export const GetProductionByDateRange = async (startDate?: string, endDate?:string) => {
    return await apiClient.get(`/bydaterange/productions?startDate=${startDate}&endDate=${endDate}`)
}