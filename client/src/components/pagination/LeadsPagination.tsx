import { Grid, IconButton, Stack } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useMemo, useState } from "react";

function LeadsPagination() {
    const [pages, setPages] = useState<number>(1)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(10)
    const total = useMemo(() => 200, [200])
    return (
        <Grid sx={{ bgcolor: "whitesmoke" }} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} md={6} >
                <Stack
                    spacing={2} direction={"row"}
                    justifyContent="center" p={2} alignItems={"center"}
                >
                    {/* limit */}
                    <label htmlFor="records">Records</label>
                    <input
                        id="records"
                        type="number"
                        value={limit}
                        style={{ width: '50px' }}
                        onChange={
                            (e) => setLimit(Number(e.target.value))
                        }
                    />
                    {/* pages */}
                    <label htmlFor="pages">PAGES</label>

                    <select id="pages"
                        style={{ width: '55px' }}
                        value={pages}
                        onChange={(e) => {
                            setPages(Number(e.target.value))
                        }}>
                        {
                            [1, 5, 10, 50, 100, 500, 1000].map(item => {
                                return (<option key={item} value={item}>
                                    {item}
                                </option>)
                            })
                        }
                    </select>
                    {/* total */}
                    <label> {`Of  ${total}`}</label>
                </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
                <Stack
                    spacing={2} direction={"row"}
                    justifyContent="center" p={2} alignItems={"center"}>
                    {/* movement */}
                    <IconButton size="small" sx={{ p: 0, m: 0 }}
                        disabled={page == 0}
                        onClick={() => {
                            setPage(page - 1)
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <label htmlFor="page">Goto Page</label>
                    <input type="text" id="page" value={page} onChange={(e) => {
                        if (Number(e.target.value) >= 0)
                            setPage(Number(e.target.value))
                    }
                    }
                        style={{ width: '40px' }}
                    />
                    <IconButton
                        disabled={page == total}
                        size="small" sx={{ p: 0, m: 0 }}
                        onClick={() => {
                            setPage(page + 1)
                        }}
                    >
                        <ArrowForwardIcon />
                    </IconButton>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default LeadsPagination