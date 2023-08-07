import styled from '@emotion/styled';
import { Menu, MenuItem } from '@mui/material'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MenuActions, MenuContext } from '../../contexts/menuContext';
import { UserContext } from '../../contexts/userContext';
import { paths } from '../../Routes';


export const StyledLink = styled(Link)`
    text-decoration: none;
    color:black;
`

function DashboardMenu() {
    const { menu, setMenu } = useContext(MenuContext)
    const { user } = useContext(UserContext)
    return (
        <Menu
            anchorEl={menu.anchorEl}
            open={Boolean(menu.type === MenuActions.dashboard_menu)}
            onClose={() => setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })}
        >
            {/* nav links */}
            <MenuItem
                onClick={
                    () => setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }

            >
                <StyledLink to={paths.dashboard}>Dashboard</StyledLink>
            </MenuItem>

            {
                user?.is_admin ? <MenuItem
                    onClick={
                        () => setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                    }>
                    <StyledLink to={paths.users}>Users</StyledLink>
                </MenuItem> : null}
            <MenuItem
                onClick={
                    () => setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }>
                <StyledLink to={paths.leads}>Leads</StyledLink>
            </MenuItem>
            <MenuItem
                onClick={
                    () => setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }>
                <StyledLink to={paths.customers}>Customers</StyledLink>
            </MenuItem>
        </Menu>
    )
}

export default DashboardMenu