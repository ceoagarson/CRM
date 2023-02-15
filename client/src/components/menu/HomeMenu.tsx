import styled from '@emotion/styled';
import { Menu, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom';
import { paths } from '../../Routes';

export const StyledLink = styled(Link)`
    text-decoration: none;
    color:black;
`
type Props = {
    anchorEl: null | HTMLElement,
    handleClose: () => void,
}
function HomeMenu({ anchorEl, handleClose }: Props) {
    const openMenu = Boolean(anchorEl);
    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
        >
            {/* nav links */}
            <MenuItem>
                <StyledLink to={paths.home}>Home</StyledLink>
            </MenuItem>
            <MenuItem>
                <StyledLink to={paths.about}>About</StyledLink>
            </MenuItem>
        </Menu>
    )
}

export default HomeMenu
