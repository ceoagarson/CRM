import { Alert, LinearProgress } from '@mui/material'
import { AxiosResponse } from 'axios'
import { useEffect, useMemo } from 'react'
import { useMutation } from 'react-query'
import {useParams } from 'react-router-dom'
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
    {
        isError ? (
          <Alert color="error">
            {error?.response.data.message}
          </Alert>
        ) : null
      }
      {
        isSuccess ? (
          <Alert color="success">
           email verified successfully
          </Alert>
        ) : null
      }

      {isLoading ? <LinearProgress /> : null
      }
    </>
  )
}
