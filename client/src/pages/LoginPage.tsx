import { Button, Typography, Stack, Paper } from '@mui/material'
import { useContext } from 'react';
import ResetPasswordSendMailDialog from '../components/dialogs/users/ResetPasswordSendMailDialog';
import SignUpDialog from '../components/dialogs/users/SignUpDialog';
import LoginForm from '../components/forms/user/LoginForm';
import { ChoiceContext, UserChoiceActions } from '../contexts/dialogContext';


function LoginPage() {
    const { setChoice } = useContext(ChoiceContext)
    return (
        <>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ height: "100vh", width: '100vw' }}>
                <Paper
                    sx={{
                        spacing: 2,
                        padding: 2
                    }}
                    elevation={16}>
                    <Typography variant="h6" sx={{ textAlign: "center" }}>Login Form</Typography>
                    <LoginForm />
                    <Stack>
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
                            <Button onClick={() => setChoice({ type: UserChoiceActions.signup })} >Register</Button>{" or "}
                            <Button onClick={() => setChoice({ type: UserChoiceActions.reset_password_mail })}> Forgot Password</Button>
                        </Typography >
                    </Stack>
                </Paper>
            </Stack>
            <SignUpDialog />
            <ResetPasswordSendMailDialog />
        </>
    )
}

export default LoginPage
