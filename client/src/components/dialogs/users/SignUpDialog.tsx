import { Dialog, DialogContent, DialogTitle, Button, DialogActions, Typography} from '@mui/material';
import { useContext } from 'react';
import { ChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import SignUpForm from '../../forms/user/SignUpForm';


function SignUpDialog() {
  const { choice, setChoice } = useContext(ChoiceContext)
  return (
    <>
      <Dialog open={choice === ChoiceActions.signup ? true : false}
        onClose={() => setChoice({ type: ChoiceActions.close })}
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

            <Button onClick={() => setChoice({ type: ChoiceActions.login })}>Login</Button>{" or "}
            <Button onClick={() => setChoice({ type: ChoiceActions.reset_password_mail })}> Forgot Password</Button>
          </Typography >
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SignUpDialog