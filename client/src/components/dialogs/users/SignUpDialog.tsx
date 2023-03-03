import { Dialog, DialogContent, DialogTitle, Button, DialogActions, Typography } from '@mui/material';
import { useContext } from 'react';
import {useNavigate } from 'react-router-dom';
import { UserChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { paths } from '../../../Routes';
import SignUpForm from '../../forms/user/SignUpForm';

function SignUpDialog() {
  const { choice, setChoice } = useContext(ChoiceContext)
  const goto=useNavigate()
  return (
    <>
      <Dialog open={choice === UserChoiceActions.signup ? true : false}
        onClose={() => setChoice({ type: UserChoiceActions.close })}
        scroll="paper"
      >
        <DialogTitle textAlign={"center"}>Owner Signup Form</DialogTitle>
        <DialogContent>
          <SignUpForm />
        </DialogContent>
        <DialogActions>
          <Typography
            variant="button"
            component="p"
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >

            <Button onClick={() =>goto(paths.login)}>Login</Button>{" or "}
            <Button onClick={() => setChoice({ type: UserChoiceActions.reset_password_mail })}> Forgot Password</Button>
          </Typography >
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SignUpDialog