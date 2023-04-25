import { AxiosResponse } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { queryClient } from '../../..';
import { UserChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { UpdateUserLeadAccess } from '../../../services/UserServices';
import { BackendError } from '../../../types';
import { Button, Checkbox, FormControlLabel,  Typography, Table, TableBody,  TableRow,  TableCell, Paper, CircularProgress, Stack, Alert } from '@mui/material'
import { IUser, LeadField, LeadFieldType } from '../../../types/user.type';



function LeadControlAccessForm({user}:{user:IUser}) {
    const { setChoice } = useContext(ChoiceContext)
    const [LeadFields, setLeadFields] = useState(user.lead_fields)
    const { mutate, isLoading, isSuccess, isError,error } = useMutation
        < AxiosResponse<any>, BackendError, { id: string, leadFields: {lead_fields:LeadField[]} }>
        (UpdateUserLeadAccess,
            {
                onSuccess: () => {
                    queryClient.invalidateQueries('users')

                }
            }
        )
    function handleHidden(key: LeadFieldType) {
        let newFields = LeadFields
        newFields = LeadFields.map((item) => {
            if (item.field === key) {
                return ({
                    ...item,
                    hidden: !item.hidden
                })
            }
            else {
                return item
            }
        })
        setLeadFields(newFields)
    }
    function handleReadOnly(key: LeadFieldType) {
        let newFields = LeadFields
        newFields = LeadFields.map((item) => {
            if (item.field === key) {
                return ({
                    ...item,
                    readonly: !item.readonly
                })
            }
            else {
                return item
            }
        })
        setLeadFields(newFields)
    }
    
    useEffect(() => {
        if (isSuccess)
            setTimeout(() => {
                setChoice({ type: UserChoiceActions.close })
            }, 1000)
    }, [setChoice, isSuccess])

  return (
   <>
          <Typography variant={"h6"} sx={{ fontWeight: "bold",textAlign:'center',backgroundColor:'rgba(0,0,0,0.1)' }}>Leads Access Control For The Selected User</Typography>
        <Stack  sx={{maxWidth:'100vw',display:'flex',overflow:'scroll'}}>
          <Table

              sx={{ minWidth: "6500px" }}
          >
              <TableBody>
                  <TableRow>
                      {
                          LeadFields.map((field, index) => {
                              return (
                                  <TableCell key={index} >
                                      <Paper sx={{ p: 2 }}>
                                          <Typography sx={{fontWeight:'bold'}}>{field.field.replace("_"," ").toLocaleUpperCase()}</Typography>
                                          <FormControlLabel control={<Checkbox checked={Boolean(field.hidden)} />} onChange={(e) => {
                                              handleHidden(field.field)
                                          }} label="Hidden" />
                                          <FormControlLabel control={<Checkbox checked={Boolean(field.readonly)} />}
                                              onChange={(e) => {
                                                  handleReadOnly(field.field)
                                              }}
                                              label="Read Only"
                                          />
                                      </Paper>
                                  </TableCell>
                              )
                          })
                      }
                  </TableRow>
              </TableBody>
          </Table>
          </Stack>

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
                      Access For selected user updated successfully
                  </Alert>
              ) : null
          }

         <Stack gap={2} p={2} direction={"row"} alignItems={"center"} justifyContent={"center"}>
              <Button size={"large"}  variant="contained" color="primary"
                  onClick={() => {
                      mutate({ id: user._id, leadFields: {lead_fields:LeadFields} })
                  }}
                  disabled={isLoading}
              >
                  {isLoading ? <CircularProgress /> :
                      "Save"}
              </Button>
              <Button  size={"large"} variant="outlined" color="primary"
                  onClick={() => {
                      setChoice({ type: UserChoiceActions.close })
                  }}
                  disabled={isLoading}
              >
                  {isLoading ? <CircularProgress /> :
                      "Cancel"}
              </Button>
         </Stack>
         
   </>
  )
}

export default LeadControlAccessForm