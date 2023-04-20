import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { darkColor } from "./utils/colors";

function App() {
  return (
    <>
      <input type="date" onChange={(e) => console.log(e.currentTarget.value)}/>
     <h1>hello</h1>
    </>
  )
}

export default App