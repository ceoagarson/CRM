import { Dialog, DialogContent, DialogTitle, Button, DialogActions } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { LeadChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import NewLeadForm from '../../forms/lead/NewLeadForm';
import { GetUsers } from '../../../services/UserServices';
import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { IUser } from '../../../types/models/user.type';
import { BackendError } from '../../../types';

function NewLeadDialog() {
  const [users,setUsers]=useState<IUser[]>([])
  const {data,isSuccess}=useQuery<AxiosResponse<IUser[]>, BackendError>("users", GetUsers)
  const { choice, setChoice } = useContext(ChoiceContext)
  useEffect(()=>{
    if(isSuccess)
    setUsers(data?.data)
  }, [users, isSuccess,data])
  return (
    <>
      <Dialog  open={choice === LeadChoiceActions.create_lead ? true : false}
      >
        <DialogTitle textAlign={"center"}>New Lead</DialogTitle>
        <DialogContent>
          <NewLeadForm users={users}/>
        </DialogContent>
        <DialogActions sx={{p:2}}>
          <Button variant='outlined' fullWidth onClick={() => setChoice({ type: LeadChoiceActions.close_lead })}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NewLeadDialog