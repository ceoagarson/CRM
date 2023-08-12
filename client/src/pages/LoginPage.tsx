import { Typography, Stack, Paper } from '@mui/material'
import { useContext } from 'react';
import ResetPasswordSendMailDialog from '../components/dialogs/users/ResetPasswordSendMailDialog';
import SignUpDialog from '../components/dialogs/users/SignUpDialog';
import LoginForm from '../components/forms/user/LoginForm';
import { ChoiceContext, UserChoiceActions } from '../contexts/dialogContext';
import { darkColor } from '../utils/colors';


function LoginPage() {
    const { setChoice } = useContext(ChoiceContext)
    return (
        <>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ height: "70vh", width: '100vw' }}>
                <Paper
                    sx={{
                        spacing: 2,
                        padding: 2,
                        borderRadius: 2
                    }}
                    elevation={8}>
                    <Typography variant="h6" sx={{ textAlign: "center" }}>Login Form</Typography>
                    <LoginForm />
                    <Stack
                        alignItems="center"
                        justifyContent="center"
                        gap={1}
                        p={1}
                        direction={"row"}
                    >
                        <Typography
                            variant="body1"
                            sx={{ cursor: "pointer" }}
                            component="span"
                            onClick={() => setChoice({ type: UserChoiceActions.signup })}
                        >
                            <b>Register</b>
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
                </Paper>
            </Stack>
            <Typography bgcolor={darkColor} sx={{ width: '100%', color: 'white', position: 'absolute', bottom: 0, alignText: 'center' }}
                variant="caption"><Typography style={{ textAlign: "center" }}>Copyright &copy; Nishu kumar</Typography></Typography>
            <SignUpDialog />
            <ResetPasswordSendMailDialog />
        </>
    )
}

export default LoginPage
