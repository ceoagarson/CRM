import { Link, Outlet } from 'react-router-dom';
import { paths } from '../Routes';
import { Stack } from '@mui/system';
import styled from '@emotion/styled';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { ChoiceActions, ChoiceContext } from '../contexts/dialogContext';
import LoginDialog from '../components/dialogs/users/LoginDialog';
import ResetPasswordSendMailDialog from '../components/dialogs/users/ResetPasswordSendMailDialog';
import SignUpDialog from '../components/dialogs/users/SignUpDialog';

import Menu from "@mui/icons-material/Menu";
import HomeMenu from '../components/menu/HomeMenu';

export const StyledLink = styled(Link)`
    text-decoration: none;
    color:white;
`
export default function HomeLayout() {
  const { setChoice } = useContext(ChoiceContext)
  const [anchorHomerEl, setAnchorHomerEl] = useState<null | HTMLElement>(null);

  function HandleHomeMenu(e: React.MouseEvent<HTMLButtonElement>) {
    setAnchorHomerEl(e.currentTarget);
  };
  function closeHomeMenu() {
    setAnchorHomerEl(null)
  }

  return (
    <>
      <Box sx={{ bgcolor: 'primary.dark',width: '100%' }}>
        {/* parent stack */}
        <Stack direction="row" sx={{
          justifyContent: "space-between", alignItems: "center",
          p:2
        }}
        >
          {/* child stack1 */}
          <Stack direction="row" gap={2}>
            <StyledLink to={paths.home}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="h6" component="span"
                  sx={{ maxWidth: '80vw', overflow: 'hidden' }}>
                  CRM
                </Typography>
              </Stack>
            </StyledLink>
          </Stack>
          {/* child stack2 */}
          <Stack direction="row"
            justifyContent={"center"}
            alignItems="center"
          >

            {/* stack1 nav links*/}
            <Stack
              direction="row"
              gap={2}
              px={2}
              sx={{
                display: { xs: 'none', md: 'flex' }
              }}
            >
              <StyledLink to={paths.home}>Home</StyledLink>
              <StyledLink to={paths.about}>About</StyledLink>
            </Stack>
            {/* stack2 right icons*/}
            <Stack
              direction="row"
              justifyContent={"center"}
              alignItems="center"
              gap={2}
            >
              <Tooltip title="open menu">
                <IconButton
                  onClick={HandleHomeMenu}
                  sx={{
                    color: "white",
                    display: {
                      xs: 'block', md: 'none'
                    }
                  }}>
                  <Menu />
                </IconButton>
              </Tooltip>
              {/* login button */}
              <Button
                variant="outlined"
                startIcon={<AccountCircle />}
                sx={{ color: "white" }}
                onClick={() => setChoice({ type: ChoiceActions.login })}
              >
                Login
              </Button>
            </Stack>
          </Stack >
        </Stack>
      </Box>
      <Outlet />
      <HomeMenu
        anchorEl={anchorHomerEl
        }
        handleClose={closeHomeMenu}
      />
      <LoginDialog />
      <ResetPasswordSendMailDialog />
      <SignUpDialog />
    </>
  )
}
