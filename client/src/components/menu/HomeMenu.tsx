import styled from '@emotion/styled';
import { Menu, MenuItem } from '@mui/material'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MenuActions, MenuContext } from '../../contexts/menuContext';
import { paths } from '../../Routes';

export const StyledLink = styled(Link)`
    text-decoration: none;
    color:black;
`
function HomeMenu() {
    const { menu, setMenu } = useContext(MenuContext)
    return (
        <Menu
            anchorEl={menu.anchorEl}
            open={Boolean(menu.type === MenuActions.home_menu)}
            onClose={() => setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })}
        >
            {/* nav links */}
            <MenuItem
                onClick={
                    () => setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }
            >
                <StyledLink to={paths.home}>Home</StyledLink>
            </MenuItem>
            <MenuItem
                onClick={
                    () => setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }
            >
                <StyledLink to={paths.about}>About</StyledLink>
            </MenuItem>
        </Menu>
    )
}

export default HomeMenu
