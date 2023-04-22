import React, { useState } from 'react'
import { IProduction } from '../../types/production.type'
import { UpdateProductionTable } from '../../components/tables/UpdateProductionTable'
import { Column } from 'react-table'
import { IconButton, Stack, Tooltip } from '@mui/material'
import { Edit } from '@mui/icons-material'

type Props={
    date:string,
    data : IProduction[]
}
function UpdateProductionPage({date,data}:Props) {
    const [productions,setProductions]=useState<IProduction[]>([])
    const MemoData = React.useMemo(() => productions, [productions])
    const MemoColumns: Column<IProduction>[] = React.useMemo(
        () => [
            // actions
            {
                Header: "Allowed Actions",
                accessor: "actions",//already used so use it for display actions
                disableSortBy: true,
                Cell: (props) => {
                    let CellUser = props.row.original
                    return (
                        <Stack direction="row">

                            {/* edit icon */}
                            <Tooltip title="edit">
                                <IconButton
                                    color="success"
                                    size="medium"
                                >
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                          
                        </Stack>
                    )
                }
            },
           
        ]
        , []
    )
  return (
      <UpdateProductionTable data = { MemoData } columns = { MemoColumns } />
  )
}

export default UpdateProductionPage