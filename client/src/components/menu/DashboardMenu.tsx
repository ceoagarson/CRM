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
function DashboardMenu({ anchorEl, handleClose }: Props) {
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
                <StyledLink to={paths.dashboard}>Dashboard</StyledLink>
            </MenuItem>
            <MenuItem>
                <StyledLink to={paths.users}>Users</StyledLink>
            </MenuItem>
            <MenuItem>
                <StyledLink to={paths.leads}>Leads</StyledLink>
            </MenuItem>
            <MenuItem>
                <StyledLink to={paths.accounts}>Accounts</StyledLink>
            </MenuItem>
            <MenuItem>
                <StyledLink to={paths.opportunities}>Opportunities</
                StyledLink>
            </MenuItem>
            <MenuItem>
                <StyledLink to={paths.activities}>Activities</StyledLink>
            </MenuItem>
        </Menu>
    )
}

export default DashboardMenu