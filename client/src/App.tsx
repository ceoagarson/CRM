import { useContext, useEffect } from "react";
import AppRoutes from "./Routes";
import { LoadingContext } from "./contexts/loaderContext";
import { LinearProgress } from "@mui/material";
import { UserContext } from "./contexts/userContext";

function App() {
  const { loading } = useContext(LoadingContext)
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (user) {
      let node = document.getElementById("login_msg")
      if (node)
        node.innerText = ""
    }
  }, [user])

  return (
    <>
      {!loading && < AppRoutes />}
      {loading && <LinearProgress />}
    </>
  )
}


export default App
