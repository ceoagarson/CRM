import { LinearProgress } from '@mui/material'
import { AxiosResponse } from 'axios'
import { useEffect, useMemo } from 'react'
import { useMutation } from 'react-query'
import { Navigate, useParams } from 'react-router-dom'
import AlertBar from '../components/alert/Alert'
import { VerifyEmail } from '../services/UserServices'
import { BackendError } from '../types'

export default function EmailVerifyPage() {
  const { token } = useParams()
  const { mutate, isSuccess, isLoading, isError, error } = useMutation
    <AxiosResponse<string>, BackendError, string>
    (VerifyEmail)
  const tokenmemo = useMemo(() => token, [token])
  useEffect(() => {
    if (tokenmemo)
      mutate(tokenmemo)
  }, [mutate, tokenmemo])
  
  return (
    <>
      {isLoading ? <LinearProgress /> : null
      }
      {isError ? <AlertBar color="error" open={isError} message={error.response.data.message} /> : null}
      {isSuccess ? <Navigate to="/" /> : null}
    </>
  )
}
