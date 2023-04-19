import { Dialog, DialogContent, DialogTitle,  Typography, Stack } from '@mui/material';
import { useContext } from 'react';
import { UserChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import SignUpForm from '../../forms/user/SignUpForm';

function SignUpDialog() {
  const { choice, setChoice } = useContext(ChoiceContext)
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
          <Stack
            alignItems="center"
            justifyContent="center"
            gap={1}
            p={1}
            direction={"row"}
            sx={{backgroundColor:"lightgrey"}}
          >
            <Typography
              variant="body1"
              sx={{ cursor: "pointer" }}
              component="span"
              onClick={() => setChoice({ type: UserChoiceActions.close })}
            >
            <b>Close</b>
            </Typography >
            {" or "}
            <Typography
              variant="body1"
              sx={{ cursor: "pointer" }}
              component="span"
              onClick={() => setChoice({ type: UserChoiceActions.reset_password_mail })}
            >
              Forgot Password
            </Typography >

          </Stack>
      </Dialog>
    </>
  )
}

export default SignUpDialog