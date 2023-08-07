import { Box, Paper, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import { darkColor } from "../utils/colors"

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
       <Box
         sx={{
           width: '100vw',
           position: "absolute",
           bottom: 0,
           textAlign: "center",
           color: 'white',
           backgroundColor: darkColor
         }}>
         <Typography
           variant="caption">Copyright &copy; Nishu kumar</Typography>
       </Box>
    </>
  )
}


export default DashBoardPage