import { apiClient } from "../utils/AxiosInterceptor"
import { Resource_Type } from "./ActivityServices"

export const ConvertResource= async ({ id, body }: {
    id: string, body: {
        resource_type: Resource_Type,
        target_resource_type: Resource_Type
    }
}) => {
    return await apiClient.post(`convert/${id}`, body)
}