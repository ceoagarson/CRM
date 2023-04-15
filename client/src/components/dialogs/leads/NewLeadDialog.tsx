import { Dialog, DialogContent, DialogTitle, Button, DialogActions } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { LeadChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import NewLeadForm from '../../forms/lead/NewLeadForm';
import { IUser } from '../../../types/user.type';
import { GetUsers } from '../../../services/UserServices';
import { BackendError } from '../../../types';
import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

function NewLeadDialog() {
  const [users,setUsers]=useState<IUser[]>([])
  const {data,isSuccess}=useQuery<AxiosResponse<IUser[]>, BackendError>("users", GetUsers, {
    refetchOnMount: true,
  })
  const { choice, setChoice } = useContext(ChoiceContext)
  useEffect(()=>{
    if(isSuccess)
    setUsers(data?.data)
  }, [users, isSuccess,data])
  return (
    <>
      <Dialog  open={choice === LeadChoiceActions.create_lead ? true : false}
        onClose={() => setChoice({ type: LeadChoiceActions.close })}
        scroll="paper"
      >
        <DialogTitle textAlign={"center"}>New Lead</DialogTitle>
        <DialogContent>
          <NewLeadForm users={users}/>
        </DialogContent>
        <DialogActions>
          <Button fullWidth onClick={() => setChoice({ type: LeadChoiceActions.close })}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NewLeadDialog