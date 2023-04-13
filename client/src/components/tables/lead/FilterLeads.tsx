import { useEffect, useState } from "react"
import { Filter } from "../../../pages/LeadsPage"
import { IconButton, Tooltip } from "@mui/material"
import { FilterList, FilterListOff } from "@mui/icons-material"
import { ILead } from "../../../types/lead.type"

function FilterLeads({ leads, setFilter }: {
    setFilter: React.Dispatch<React.SetStateAction<Filter>>,
    leads?: ILead[]
}) {
    const [filter, setFilterKeys] = useState<Filter>([])
    useEffect(() => {
        if (filter.length > 0)
            setFilter(filter)
        else
            setFilter([])
    }, [filter, setFilter])
    return (
        <>
            <Tooltip title="Apply filter">
                <IconButton
                    onClick={() => {
                        setFilterKeys([{ key: 'customer_name', value: "sandeep" }])
                    }}
                >
                    <FilterList />
                </IconButton>
            </Tooltip>
            {
                filter.length > 0 ?
                    <Tooltip title="Remove filter">
                        <IconButton
                            onClick={() => {
                                setFilterKeys([])
                            }}
                        >
                            <FilterListOff />
                        </IconButton>
                    </Tooltip>
                    :
                    null
            }
        </>
    )
}
export default FilterLeads