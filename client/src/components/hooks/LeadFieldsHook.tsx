import { useContext } from "react"
import { UserContext } from "../../contexts/userContext"

export function useLeadFields() {
    const { user } = useContext(UserContext)
        let hiddenFields =user?.lead_fields.map((field) => {
            if (field.hidden)
                return field.field
                else
            return undefined
        }) 

        let readonlyFields =user?.lead_fields.map((field) => {
            if (field.readonly)
                return field.field
            else
                return undefined
        })  
        
    return { hiddenFields, readonlyFields }
}