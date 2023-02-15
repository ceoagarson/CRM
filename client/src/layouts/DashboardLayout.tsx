import { Link, Outlet, useNavigate } from 'react-router-dom';
import { paths } from '../Routes';
import { Stack } from '@mui/system';
import styled from '@emotion/styled';
import { Avatar, Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { UserActions, UserContext } from '../contexts/userContext';
import { AccountCircle } from '@mui/icons-material';
import { ChoiceActions, ChoiceContext } from '../contexts/dialogContext';
import LoginDialog from '../components/dialogs/users/LoginDialog';
import ResetPasswordSendMailDialog from '../components/dialogs/users/ResetPasswordSendMailDialog';
import SignUpDialog from '../components/dialogs/users/SignUpDialog';
import UserMenu from '../components/menu/UserMenu';
import { useMutation } from 'react-query';
import { Logout } from '../services/UserServices';
import Menu from "@mui/icons-material/Menu";
import DashboardMenu from '../components/menu/DashboardMenu';

export const StyledLink = styled(Link)`
    text-decoration: none;
    color:white;
`
export default function DashboardLayout() {
  const { user, dispatch } = useContext(UserContext)
  const { setChoice } = useContext(ChoiceContext)
  const [anchorUserEl, setAnchorUserEl] = useState<null | HTMLElement>(null);
  const [anchorHomerEl, setAnchorHomerEl] = useState<null | HTMLElement>(null);
  const { mutate, isSuccess } = useMutation(Logout)
  const goto = useNavigate()

  function handleLogout() {
    mutate()
  }

  function HandleDashboardMenu(e: React.MouseEvent<HTMLButtonElement>) {
    setAnchorHomerEl(e.currentTarget);
  };
  function closeDashboardMenu() {
    setAnchorHomerEl(null)
  }
  function handleUserMenu(e: React.MouseEvent<HTMLButtonElement>) {
    setAnchorUserEl(e.currentTarget);
  };
  function closeUserMenu() {
    setAnchorUserEl(null)
  }
  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: UserActions.logout })
      setChoice({ type: ChoiceActions.close })
      setAnchorUserEl(null)
      goto(paths.home)
    }
  }, [dispatch, goto, setChoice, isSuccess])

  return (
    <>
      <Box sx={{ bgcolor: 'primary.dark',width: '100%' }}>
        {/* parent stack */}
        <Stack direction="row" sx={{
          justifyContent: "space-between", alignItems: "center"
        }}
        >
          {/* child stack1 */}
          <Stack direction="row" gap={2} pl={1} sx={{ maxWidth: "300px", overflow: "hidden" }}>
            <StyledLink to={paths.dashboard}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="h6" component="span"
                  letterSpacing={1}
                >
                  {user ? user.organization?.organization_name.toUpperCase() : "CRM"}
                </Typography>
              </Stack>
            </StyledLink>
          </Stack>
          {/* child stack2 */}
          <Stack direction="row"
            justifyContent={"center"}
            alignItems="center"
          >
            {user ?
              <>
                {/* stack1 nav links*/}
                <Stack
                  direction="row"
                  gap={2}
                  px={2}
                  sx={{
                    display: { xs: 'none', md: 'flex' }
                  }}
                >

                  <StyledLink to={paths.users}>Users</StyledLink>
                  <StyledLink to={paths.leads}>Leads</StyledLink>
                  <StyledLink to={paths.accounts}>Accounts</StyledLink>
                  <StyledLink to={paths.opportunities}>Opportunities</
                  StyledLink>
                  <StyledLink to={paths.activities}>Activities</StyledLink>
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
                      onClick={HandleDashboardMenu}
                      sx={{
                        color: "white",
                        display: {
                          xs: 'block', md: 'none'
                        }
                      }}>
                      <Menu />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="open settings">
                    <IconButton
                      onClick={handleUserMenu}
                    >
                      <Avatar
                        alt="img1" src={user.dp?.url} />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </>
              :
              <>
                {/* login button */}
                <Button
                  variant="outlined"
                  startIcon={<AccountCircle />}
                  sx={{ color: "white" }}
                  onClick={() => setChoice({ type: ChoiceActions.login })}
                >
                  Login
                </Button>
              </>
            }
          </Stack >
        </Stack>
      </Box>
      <Outlet />
      <UserMenu
        anchorEl={anchorUserEl
        }
        handleLogout={handleLogout}
        handleClose={closeUserMenu}
      />
      <DashboardMenu
        anchorEl={anchorHomerEl
        }
        handleClose={closeDashboardMenu}
      />

      <LoginDialog />
      <ResetPasswordSendMailDialog />
      <SignUpDialog />
    </>
  )
}
