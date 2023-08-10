import { Pagination, PaginationItem, Stack } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function UsersPagination() {
    return (
        <Stack spacing={2} direction="row" justifyContent="center" p={2}>
            <Pagination
                count={10}
                renderItem={(item) => (
                    <PaginationItem
                        slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                        {...item}
                    />
                )}
            />
        </Stack>
    )
}

export default UsersPagination