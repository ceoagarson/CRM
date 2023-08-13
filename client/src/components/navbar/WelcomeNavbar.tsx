import { Link, Outlet } from 'react-router-dom';
import { Stack } from '@mui/system';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import ResetPasswordSendMailDialog from '../dialogs/users/ResetPasswordSendMailDialog';
import SignUpDialog from '../dialogs/users/SignUpDialog';
import AgarsonLogo from '../logo/Agarson';

export const StyledLink = styled(Link)`
    text-decoration: none;
    color:white;
`
export default function WelcomeNavBar() {
    return (
        <>
            <Box sx={{ width: '100%', p: 0.6 }}>
                {/* parent stack */}
                <Stack direction="row" sx={{
                    justifyContent: "space-between", alignItems: "center"
                }}
                >
                    {/* child stack1 */}
                    <Stack direction="column" gap={2} pl={1}>
                        <AgarsonLogo />
                    </Stack>
                </Stack>
            </Box >
            <Outlet />
            <ResetPasswordSendMailDialog />
            <SignUpDialog />
        </>
    )
}
