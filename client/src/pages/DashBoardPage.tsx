import { Box, Paper, Typography } from "@mui/material"
import { Stack } from "@mui/system"

function DashBoardPage() {
   return (
    <>
      <Box>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-around"
          spacing={2}
          padding={2}
        >

          {/* leads */}
          <Paper sx={{ padding: 2 }}>
            <Stack
              spacing={2}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h6">Dashboard page</Typography>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </>
  )
}


export default DashBoardPage