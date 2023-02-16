import { Fade, IconButton, Menu, MenuItem, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ColumnInstance, Row } from 'react-table';
import ToogleColumns from './ToogleColumns';
import { Menu as MenuIcon } from '@mui/icons-material';
import ExportToExcel from '../utils/ExportToExcel';
import { IUser } from '../../../types/user.type';

type Props = {
    columns: ColumnInstance<IUser>[],
    selectedFlatRows: Row<IUser>[]
}
type SelectedData = {
    username?: string,
    email?: string,
    dp?: string,
    email_verified?: Boolean,
    is_active?: Boolean,
    last_login?: string,
    organization?: string,
    organization_email?: string,
    roles?: string,
    createdAt?: string,
    createdBy?: string

}
function TableMenu({ columns, selectedFlatRows }: Props) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [toogleCol, setToogleCol] = useState(false)
    const openMenu = Boolean(anchorEl);
    const [selectedData, setSelectedData] = useState<SelectedData[]>([])
    const [sent, setSent] = useState(false)


    function handleExcel() {
        try {
            ExportToExcel(selectedData, "USERS_DATA")
            setSent(true)
        }
        catch (err) {
            setSent(false)
        }

    }
    // tooogle columns false
    function setToogleClose() {
        setToogleCol(false)
        setAnchorEl(null)
    }
    // open  menu
    function setAnchorElement(e: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(e.currentTarget);
    };
    // close menu
    function handleClose() {
        setAnchorEl(null)
    }
    // refine data
    useEffect(() => {
        let data: SelectedData[] = []
        selectedFlatRows.map((item) => {
            const user = item.original
            let lastlogin = undefined
            let created_at = undefined
            if (user.last_login && user.createdAt) {
                lastlogin = new Date(user.last_login).toLocaleDateString()
                created_at = new Date(user.createdAt).toLocaleDateString()
            }
            return data.push({
                username: user.username,
                email: user.email,
                dp: user.dp?.url,
                email_verified: user.email_verified,
                is_active: user.is_active,
                last_login: lastlogin,
                organization: user.organization?.organization_name,
                organization_email: user.organization?.organization_email,
                roles: user.roles?.toString(),
                createdAt: created_at
            })
        })
        setSelectedData(data)
    }, [selectedFlatRows])
    return (
        <>
            {/* snak bar */}
            <Snackbar
                open={sent}
                autoHideDuration={6000}
                onClose={() => setSent(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                message="File Exported Successfuly"
            />

            <IconButton size="medium" onClick={setAnchorElement}>
                <MenuIcon />
            </IconButton>
            <ToogleColumns columns={columns} open={toogleCol} handleClose={setToogleClose} />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                TransitionComponent={Fade}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => setToogleCol(true)}>Show and hide columns</MenuItem>
                <MenuItem onClick={handleExcel}>Export To Excel</MenuItem>
            </Menu>

        </>
    )
}

export default TableMenu