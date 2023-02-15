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
function TableMenu({ columns, selectedFlatRows }: Props) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [toogleCol, setToogleCol] = useState(false)
    const openMenu = Boolean(anchorEl);
    const [selectedData, setSelectedData] = useState<IUser[]>([])
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
        let data: IUser[] = []
        selectedFlatRows.map((item) => {
            return data.push(item.original)
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