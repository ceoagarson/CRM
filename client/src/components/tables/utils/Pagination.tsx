import { ArrowLeft, ArrowRight, SkipNext, SkipPrevious } from '@mui/icons-material'
import { IconButton, Stack, TextField, Typography } from '@mui/material'
import { colorHover } from '../../../utils/colors'

interface Props {
    pageIndex: number,
    pageSize: number,
    canPreviousPage: boolean,
    canNextPage: boolean,
    pageOptions: number[],
    pageCount: number,
    gotoPage: (updater: number | ((pageIndex: number) => number)) => void,
    nextPage: () => void,
    previousPage: () => void,
    setPageSize: (pageSize: number) => void,
}
function Pagination({
    pageIndex,
    pageSize,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize }: Props) {
    return (
        <>
            {/* pagination */}
            <Stack
                bgcolor={colorHover}
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                padding={1}
            >
                <Typography sx={{ display: { xs: 'none', sm: 'flex' } }} component="div" variant="body1">
                    Page  {pageIndex + 1} of {pageOptions.length}
                </Typography>
                <Typography sx={{ display: { xs: 'none', sm: 'flex' } }} component="div" variant="body1">
                    Go to page:
                </Typography>
                <TextField
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                    size='small'
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(page)
                    }}
                />
                <TextField
                    select
                    SelectProps={{
                        native: true,
                    }}
                    size="small"
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[5, 10, 15, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </TextField>
                <IconButton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {<ArrowLeft />}
                </IconButton>
                <IconButton onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {<SkipPrevious />}
                </IconButton>
                <IconButton onClick={() => nextPage()} disabled={!canNextPage}>
                    {<SkipNext />}

                </IconButton>
                <IconButton onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {<ArrowRight />}
                </IconButton>
            </Stack>
        </>
    )
}

export default Pagination