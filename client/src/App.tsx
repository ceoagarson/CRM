import { useState } from "react"
import { apiClient } from "./services/utils/AxiosInterceptor"

function App() {
  const [file, setFile] = useState<string | File | Blob>("")
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    let formdata = new FormData()
    formdata.append('visiting_card', file)
    let body = {
      mobile: 7056943283,
      alternate_mobile1: 7056943274,
      alternate_mobile2: 70569432866,
      remark: "good party",
      lead_owners: ["64cd1790ecaa5d269abfcf5d"]
    }
    let jsonstring = JSON.stringify(body)
    formdata.append("body", jsonstring)
    apiClient.post("/test", formdata)
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input type="file" onChange={(e) => {
        if (e.currentTarget.files)
          setFile(e.currentTarget.files[0])
      }} name="visiting_card" id="visiting_card" />
      <button type="submit">submit</button>
    </form>
  )
}

export default App