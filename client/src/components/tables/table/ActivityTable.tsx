import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { Column, useTable, useSortBy, usePagination, useGlobalFilter, useRowSelect } from 'react-table'
import Pagination from '../utils/Pagination';
import SearchBar from './SearchBar';
import TableCheckBox from '../utils/TableCheckBox';
import TableMenu from './TableMenu';
import { Stack } from '@mui/system';
import { color1, color2, headColor } from '../../../utils/colors';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { IActivity } from '../../../types/activity.type';

interface Props {
    data: IActivity[],
    columns: Column<IActivity>[]
}

export function ActivityTable({ data, columns }: Props) {
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
        allColumns,
        selectedFlatRows,
        state: { pageIndex, pageSize },
    } = useTable({
        data, columns, initialState: {
            pageSize: 10,
            hiddenColumns: ['']
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
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                     Activities
                </Typography>
                <Stack
                    direction="row"

                >
                    <SearchBar
                        preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter}
                    />
                    <TableMenu
                        columns={allColumns}
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
                     sx={{ minWidth: "1920px" }}
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
                                                onDoubleClick={(e) => {
                                                    navigator.clipboard.writeText(e.currentTarget.innerText)
                                                }}

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