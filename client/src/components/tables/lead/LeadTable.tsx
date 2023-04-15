import { Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import { Column, useTable, useSortBy, usePagination, useGlobalFilter, useRowSelect } from 'react-table'
import Pagination from '../utils/Pagination';
import SearchBar from './SearchBar';
import TableCheckBox from '../utils/TableCheckBox';
import TableMenu from './TableMenu';
import { Stack } from '@mui/system';
import { color1, color2, headColor } from '../../../utils/colors';
import { ArrowDropDown, ArrowDropUp, FilterList } from '@mui/icons-material';
import { ILead } from '../../../types/lead.type';
import { Filter } from '../../../pages/LeadsPage';
import { useContext } from 'react';
import { ChoiceContext, LeadChoiceActions } from '../../../contexts/dialogContext';
import DisplayFilterDialog from '../../dialogs/leads/DisplayFilterDialog';
import { UserContext } from '../../../contexts/userContext';

interface Props {
    data: ILead[],
    columns: Column<ILead>[],
    setFilter: React.Dispatch<React.SetStateAction<Filter>>
}

export function LeadTable({ data, columns, setFilter }: Props) {
    const { choice, setChoice } = useContext(ChoiceContext)
    const { user } = useContext(UserContext)

    const CalculateHiddenColumns = () => {
        let hidden_fields = ['']
        user?.lead_fields.map((field) => {
            if(field.hidden)
                hidden_fields.push(field.field)
            return null
        })
        return hidden_fields
    }
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setGlobalFilter,
        preGlobalFilteredRows,
        globalFilter,
        selectedFlatRows,
        state: { pageIndex, pageSize },
    } = useTable({
        data, columns, initialState: {
            pageSize: 10,
            hiddenColumns: CalculateHiddenColumns()
        }
    },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                // Let's make a column for selection
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <TableCheckBox {...getToggleAllRowsSelectedProps()} />
                    ),
                    // @ts-ignore for any type for row
                    Cell: ({ row }) => (
                        <TableCheckBox {...row.getToggleRowSelectedProps()} />
                    ),
                },
                ...columns,
            ])
        }
    )
    
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
                    LEADS
                </Typography>

                <Stack
                    direction="row"
                >
                    <Tooltip title="Apply filter">
                        <IconButton
                            onClick={() => {
                                setChoice({ type: LeadChoiceActions.display_filter })
                            }}
                        >
                            <FilterList />
                        </IconButton>
                    </Tooltip>
                    {
                        choice === LeadChoiceActions.display_filter ?
                            <DisplayFilterDialog setFilter={setFilter} /> : null
                    }
                    <SearchBar
                        preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter}
                    />
                    <TableMenu
                        selectedFlatRows={selectedFlatRows}
                    />
                </Stack>
            </Stack>
            {/* table */}
            <Box
                sx={{
                    overflow: "scroll",
                    height: '70vh'
                }}>
                <Table
                    sx={{ minWidth: "2400px" }}
                    size="small"
                    {...getTableProps()}>
                    <TableHead
                    >
                        {headerGroups.map(headerGroup => (
                            <TableRow  {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map
                                    ((column) => (
                                        <TableCell
                                            sx={{ bgcolor: headColor }}
                                            {...column.getHeaderProps(column.getSortByToggleProps())}
                                            title=""                                    >
                                            <Stack
                                                direction="row"
                                                justifyContent="left"
                                                alignItems="left"
                                                spacing={2}
                                            >
                                                {column.render('Header')}
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? <ArrowDropDown />
                                                        : <ArrowDropUp />
                                                    : ''}
                                            </Stack>
                                        </TableCell>
                                    ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row)
                            return (


                                <TableRow sx={{
                                    '&:nth-of-type(odd)': { bgcolor: color1 },
                                    '&:nth-of-type(even)': { bgcolor: color2 },
                                    '&:hover': { bgcolor: 'rgba(0,0,0,0.1)', cursor: 'pointer' }
                                }}

                                    {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <TableCell
                                                {...cell.getCellProps()}


                                            >
                                                {cell.render('Cell')}
                                            </TableCell>

                                        )
                                    })}

                                </TableRow>

                            )
                        })}
                    </TableBody>
                </Table>
            </Box>
            {/* pagination */}
            <Pagination
                pageIndex={pageIndex}
                pageSize={pageSize}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage} pageOptions={pageOptions}
                pageCount={pageCount}
                gotoPage={gotoPage}
                nextPage={nextPage}
                previousPage={previousPage} setPageSize={setPageSize}
            />
        </>
    )
}