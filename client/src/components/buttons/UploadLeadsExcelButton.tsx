import { AxiosResponse } from "axios"
import React from "react"
import { useMutation } from "react-query"
import { styled } from "styled-components"
import { BackendError } from "../../types"
import { BulkLeadUpdateFromExcel } from "../../services/LeadsServices"
import { queryClient } from "../../main"
import { ILeadTemplate } from "../../types/leads/lead.template.types"
import { Snackbar } from "@mui/material"
import ExportToExcel from "../tables/utils/ExportToExcel"

const FileInput = styled.input`
background-color:blue;
color:white;
`
function UploadLeadsExcelButton() {
  const [leads, setLeads] = React.useState<ILeadTemplate[]>()
  const { data, mutate, isLoading, isSuccess } = useMutation
    <AxiosResponse<ILeadTemplate[]>, BackendError, FormData>
    (BulkLeadUpdateFromExcel, {
      onSuccess: () => {
        queryClient.fetchQuery('leads')
        queryClient.fetchQuery('customers')
      }
    })
  const [file, setFile] = React.useState<File | null>(null)


  function handleFile() {
    if (file) {
      let formdata = new FormData()
      formdata.append('file', file)
      mutate(formdata)
    }
  }
  React.useEffect(() => {
    if (file) {
      handleFile()
    }
  }, [file])


  React.useEffect(() => {
    if (data) {
      setLeads(data.data)
    }
  }, [data, leads])

  React.useEffect(() => {
    if (isSuccess) {
      ExportToExcel(data.data, "errors_leads_data")
    }
  }, [isSuccess])
  return (
    <>
      {
        isSuccess ?
          <Snackbar
            open={isSuccess}
            autoHideDuration={6000}
            onClose={() => setFile(null)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            message="Uploaded Successfuly wait for some minutes"
          /> : null
      }
      {
        isLoading ?
          "Loading..."
          :
          <FileInput className="" type="file" required name="file" onChange={
            (e: any) => {
              if (e.currentTarget.files) {
                setFile(e.currentTarget.files[0])
              }
            }}>
          </FileInput >

      }
    </>
  )
}

export default UploadLeadsExcelButton