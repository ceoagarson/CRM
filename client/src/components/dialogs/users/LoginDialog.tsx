import { Dialog, DialogContent, DialogTitle, Button, DialogActions, Typography } from '@mui/material'
import { useContext } from 'react';
import { ChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import LoginForm from '../../forms/user/LoginForm';


function LoginDialog() {
  const { choice, setChoice } = useContext(ChoiceContext)
  return (
    <>
      <Dialog open={choice === ChoiceActions.login ? true : false}
        onClose={() => setChoice({ type: ChoiceActions.close })}
      >
        <DialogTitle textAlign="center">Login Form</DialogTitle>
        <DialogContent>
          <LoginForm />
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
            <Button onClick={() => setChoice({ type: ChoiceActions.signup })} >Register</Button>{" or "}
            <Button onClick={() => setChoice({ type: ChoiceActions.reset_password_mail })}> Forgot Password</Button>
          </Typography >
        </DialogActions>
      </Dialog >
    </>
  )
}

export default LoginDialog
