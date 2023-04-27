import { apiClient } from "./utils/AxiosInterceptor"


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

export const GetCategories = async () => {
    return await apiClient.get(`categories`)
}
export const NewCategory = async (body: { category: string }) => {
    return await apiClient.post(`categories`, body)
}
export const UpdateCategory = async ({ id, body }: { id: string, body: {category: string } }) => {
    return await apiClient.put(`categories/${id}`, body)
}
