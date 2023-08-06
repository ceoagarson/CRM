import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { Column, useTable, useSortBy, usePagination, useGlobalFilter, useRowSelect } from 'react-table'
import Pagination from './utils/Pagination';
import TableCheckBox from './utils/TableCheckBox';
import { Stack } from '@mui/system';
import { color1, color2, headColor } from '../../utils/colors';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { IUser } from '../../types/users/user.type';
import { useContext, useEffect } from 'react';
import { SelectionContext } from '../../contexts/selectionContext';


interface Props {
    data: IUser[],
    columns: Column<IUser>[]
}

export function UserTable({ data, columns }: Props) {
    const { setSelectedRows } = useContext(SelectionContext)
    // table hook
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
        selectedFlatRows,
        state: { pageIndex, pageSize },
    } = useTable({
        data, columns, initialState: {
            pageSize: 10,
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
    useEffect(() => {
        setSelectedRows(selectedFlatRows)
    }, [selectedFlatRows, setSelectedRows])
    return (
        <>
            {/* table */}
            <Box
                sx={{
                    overflow: "scroll",
                    height: '73.5vh'
                }}>
                <Table
                    sx={{ minWidth: "1500px" }}
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
                                                {...cell.getCellProps()} >
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