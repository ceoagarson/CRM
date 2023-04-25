import React, { useState, useContext, useEffect } from 'react'
import { IProduction } from '../../types/production.type'
import { UpdateProductionTable } from '../../components/tables/UpdateProductionTable'
import { Column } from 'react-table'
import { IconButton, InputAdornment, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { Edit, Search } from '@mui/icons-material'
import UpdateProductionDialog from '../../components/dialogs/production/UpdateProductionDialog'
import { ChoiceContext, ProductionChoiceActions } from '../../contexts/dialogContext'
import FuzzySearch from 'fuzzy-search'
import { FilterContext } from '../../contexts/filterContext'
import { headColor } from '../../utils/colors'

type Props = {
    data: IProduction[]
}

function UpdateProductionPage({ data }: Props) {
    const { filter, setFilter } = useContext(FilterContext)
    const [preFilteredData, setPreFilteredData] = useState<IProduction[]>([])
    const [productions, setProductions] = useState<IProduction[]>(data)
    const [production, setProduction] = useState<IProduction>()
    const { setChoice } = useContext(ChoiceContext)
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
                                    onClick={() => {
                                        setProduction(props.row.original)
                                        setChoice({ type: ProductionChoiceActions.update_production })
                                    }
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
                        <Typography sx={{ textTransform: "uppercase" }}>{props.row.original.machine.name}</Typography>
                    )
                }
            },
            // category name
            {
                Header: 'Category',
                accessor: 'category',
                Cell: (props) => {
                    return (
                        <Typography sx={{ textTransform: "uppercase" }}>{props.row.original.machine.category.category}</Typography>
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
                        <Typography sx={{ textTransform: "uppercase" }}>{props.row.original.production}</Typography>
                    )
                }
            },
            // Createt At
            {
                Header: 'Created At',
                accessor: 'created_at',
                Cell: (props) => {
                    return (
                        <Typography sx={{ textTransform: "uppercase" }}>{new Date(props.row.original.machine.created_at).toLocaleDateString()}</Typography>
                    )
                }
            }

        ]
        , [setChoice]
    )
    useEffect(() => {
        setProductions(data)
        setPreFilteredData(data)
    }, [data])

    //set filter
    useEffect(() => {
        if (filter) {
            const searcher = new FuzzySearch(productions, ["machine.name", "category", "production"], {
                caseSensitive: false,
            });
            const result = searcher.search(filter);
            setProductions(result)
        }
        if (!filter)
            setProductions(preFilteredData)
    }, [filter, preFilteredData, productions])

    return (

        <>
            {/*heading, search bar and table menu */}
            <Stack
                spacing={2}
                padding={1}
                direction="row"
                justifyContent="space-between"
                width="100vw"
            >
                <Typography
                    variant={'h6'}
                    component={'h1'}
                >
                    Productions
                </Typography>

                <Stack
                    direction="row"
                >
                    {/* search bar */}
                    < Stack direction="row" spacing={2} sx={{ bgcolor: headColor }
                    }>
                        <TextField
                            fullWidth
                            size="small"
                            onChange={(e) => setFilter(e.currentTarget.value)}
                            autoFocus
                            InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>,
                            }}
                            placeholder={`${productions.length} records...`}
                            style={{
                                fontSize: '1.1rem',
                                border: '0',
                            }}
                        />

                    </Stack >
                </Stack>
            </Stack>
            <UpdateProductionTable data={MemoData} columns={MemoColumns} />
            {production ? <UpdateProductionDialog production={production} /> : null}
        </>)
}

export default UpdateProductionPage