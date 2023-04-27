import { Edit, Search } from "@mui/icons-material"
import { IconButton, InputAdornment, LinearProgress, Stack, TextField, Tooltip, Typography } from "@mui/material"
import FuzzySearch from 'fuzzy-search';
import { AxiosResponse } from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Column } from "react-table"
import { ChoiceContext, CategoryChoiceActions } from "../contexts/dialogContext"
import { ICategory } from '../types/production.type'
import { BackendError } from "../types"
import { SelectionContext } from "../contexts/selectionContext"
import { headColor } from "../utils/colors"
import { FilterContext } from "../contexts/filterContext"
import { GetCategories } from "../services/ProductionServices";
import UpdateCategoryDialog from "../components/dialogs/categories/UpdateCategoryDialog";
import { CategoryTable } from "../components/tables/CategoryTable";
import CategoryTableMenu from "../components/menu/CategoryTableMenu";


export default function CategoriesPage() {
    const { selectedRows } = useContext(SelectionContext)
    const { filter, setFilter } = useContext(FilterContext)
    const { setChoice } = useContext(ChoiceContext)
    const [preFilteredData, setPreFilteredData] = useState<ICategory[]>([])
    const [DATA, setDATA] = useState<ICategory[]>([])
    const [category, setCategory] = useState<ICategory>()
    const { data: categories, isSuccess, isLoading } = useQuery
        <AxiosResponse<ICategory[]>, BackendError>("categories", GetCategories)
    const MemoData = React.useMemo(() => DATA, [DATA])
    const MemoColumns: Column<ICategory>[] = React.useMemo(
        () => [
            //actions
            {
                Header: 'Actions',
                accessor: 'actions',
                disableSortBy: true,
                Cell: (props) => {
                    return (
                        <Stack direction="row" spacing={1}>
                            <Tooltip title="edit">
                                <IconButton color="secondary"
                                    onClick={() => {
                                        setChoice({ type: CategoryChoiceActions.update_category })
                                        setCategory(props.row.original)
                                    }}
                                >
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    )
                }
            },
            // category
            {
                Header: 'Category',
                accessor: 'category',
                Cell: (props) => {
                    return (
                        <Typography sx={{ textTransform: "uppercase" }}>{props.row.original.category}</Typography>
                    )
                }
            },
            //created at
            {
                Header: 'Created At',
                accessor: 'created_at',
                Cell: (props) => {
                    return (
                        <Typography sx={{ textTransform: "uppercase" }}>{new Date(props.row.original.created_at).toLocaleString()}</Typography>
                    )
                }
            },
            //created by
            {
                Header: 'Created By',
                accessor: 'created_by',
                Cell: (props) => {
                    return (
                        <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.created_by.username}</Typography>
                    )
                }
            },
            //updated at
            {
                Header: 'Last Updated At',
                accessor: 'updated_at',
                Cell: (props) => {
                    return (
                        <Typography sx={{ textTransform: "uppercase" }}>{new Date(props.row.original.updated_at).toLocaleString()}</Typography>
                    )
                }
            },
            //updated by
            {
                Header: 'Last Updated By',
                accessor: 'updated_by',
                Cell: (props) => {
                    return (
                        <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.updated_by.username}</Typography>
                    )
                }
            },
        ]
        , [setChoice]
    )

    //setup categories
    useEffect(() => {
        if (isSuccess) {
            setDATA(categories.data)
            setPreFilteredData(categories.data)
        }
    }, [isSuccess, categories])

    //set filter
    useEffect(() => {
        if (filter) {
            const searcher = new FuzzySearch(DATA, ["category", "created_at", "created_by.username", "updated_at", "updated_by.username"], {
                caseSensitive: false,
            });
            const result = searcher.search(filter);
            setDATA(result)
        }
        if (!filter)
            setDATA(preFilteredData)
    }, [filter, preFilteredData, DATA])
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
                    Categories
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
                            placeholder={`${DATA.length} records...`}
                            style={{
                                fontSize: '1.1rem',
                                border: '0',
                            }}
                        />

                    </Stack >
                    {/* menu  */}
                    <CategoryTableMenu
                        selectedFlatRows={selectedRows}
                    />
                </Stack>
            </Stack>
            <CategoryTable data={MemoData} columns={MemoColumns} />
            {
                category ?
                    <>
                        <UpdateCategoryDialog category={category} />
                    </>
                    : null
            }
            {
                isLoading && <LinearProgress />
            }
        </>
    )
}
