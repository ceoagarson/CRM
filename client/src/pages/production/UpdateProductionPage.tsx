import React, { useState, useContext, useEffect } from 'react'
import { IProduction } from '../../types/production.type'
import { UpdateProductionTable } from '../../components/tables/UpdateProductionTable'
import { Column } from 'react-table'
import { IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { Edit } from '@mui/icons-material'
import UpdateProductionDialog from '../../components/dialogs/production/UpdateProductionDialog'
import { ChoiceContext, ProductionChoiceActions } from '../../contexts/dialogContext'

type Props={
    date:string,
    data : IProduction[]
}

function UpdateProductionPage({date,data}:Props) {
    const [productions,setProductions]=useState<IProduction[]>([])
    const [production,setProduction]=useState<IProduction>()
    const {setChoice}=useContext(ChoiceContext)
    const MemoData = React.useMemo(() => productions, [productions])
    const MemoColumns: Column<IProduction>[] = React.useMemo(
        () => [
          
            // actions
            {
                Header: "Allowed Actions",
                accessor: "actions",//already used so use it for display actions
                disableSortBy: true,
                Cell: (props) => {
                    return (
                        <Stack direction="row">
                            {/* edit icon */}
                            <Tooltip title="edit">
                                <IconButton
                                    color="success"
                                    size="medium"
                                    onClick={()=>{
                                        setProduction(props.row.original)
                                        setChoice({type:ProductionChoiceActions.update_production})}
                                    }
                                >
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    )
                }
            },
            
            // machine name
            {
                Header: 'Machine Name',
                accessor: 'machine',
                Cell: (props) => {
                    return (
                        <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machine.name}</Typography>
                    )
                }
            },
            // category name
            {
                Header: 'Category',
                accessor: 'category',
                Cell: (props) => {
                    return (
                        <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machine.category}</Typography>
                    )
                }
            }
           ,
            // production name
            {
                Header: 'Production',
                accessor: 'production',
                Cell: (props) => {
                    return (
                        <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.production}</Typography>
                    )
                }
            },
            // Createt At
            {
                Header: 'Created At',
                accessor: 'created_at',
                Cell: (props) => {
                    return (
                        <Typography sx={{ textTransform: "capitalize" }}>{new Date(props.row.original.machine.created_at).toLocaleDateString()}</Typography>
                    )
                }
            }

        ]
        , [setChoice]
    )
    useEffect(()=>{
        setProductions(data)
    }, [data])
  return (

<>
          <UpdateProductionTable data={MemoData} columns={MemoColumns} />
          {production ? <UpdateProductionDialog production={production} />:null}
</>    )
}

export default UpdateProductionPage