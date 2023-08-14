import { Typography, Stack, Paper } from '@mui/material'
import { useContext } from 'react';
import ResetPasswordSendMailDialog from '../../components/dialogs/users/ResetPasswordSendMailDialog';
import SignUpDialog from '../../components/dialogs/users/SignUpDialog';
import LoginForm from '../../components/forms/user/LoginForm';
import { ChoiceContext, UserChoiceActions } from '../../contexts/dialogContext';
import AgarsonLogo from '../../components/logo/Agarson';


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
                    <Stack justifyContent={"center"} alignItems="center">
                        <a href="https://agarsonshoes.in/">
                            <AgarsonLogo width={80} height={80} title='Agarson Shoes' />
                        </a>
                    </Stack>
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

            <Stack sx={{ width: '100%', position: 'absolute', bottom: 0, alignText: 'center', p: 2 }}
            >
                <Typography component="h1" variant="button" style={{ textAlign: "center", fontWeight: 'bold' }}>Copyright &copy; Agarson Shoes Pvt Ltd </Typography>
                <Typography variant="caption" component="p" sx={{ textAlign: "center", fontWeight: '400' }}><a href="https://github.com/kumarnishu">Developer : Nishu kumar 91-7056943283</a></Typography>
            </Stack>
            <SignUpDialog />
            <ResetPasswordSendMailDialog />
        </>
    )
}

export default LoginPage
