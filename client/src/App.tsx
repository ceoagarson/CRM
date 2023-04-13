import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import AppRoutes from "./Routes";
import { darkColor } from "./utils/colors";

function App() {
  return (
    <>
      <AppRoutes />
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

export default App