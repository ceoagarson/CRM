import { Fade, IconButton, Menu, MenuItem, Snackbar } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { ColumnInstance, Row } from 'react-table';
import ToogleColumns from './ToogleColumns';
import { Menu as MenuIcon } from '@mui/icons-material';
import ExportToExcel from '../utils/ExportToExcel';
import { IActivity } from '../../../types/activity.type';
import { MenuActions, MenuContext } from '../../../contexts/menuContext';

type Props = {
    columns: ColumnInstance<IActivity>[],
    selectedFlatRows: Row<IActivity>[]
}
type SelectedData = {
    activity_type?: string,
    description?: string,
    remarks?: string,
    activity_owner?: string,
    resource_id?: string,
    resource_type?: string,
    status_changed_by?: string,
    updated_by?: string,
    updated_at?: string,
    created_at?: string,

}
function TableMenu({ columns, selectedFlatRows }: Props) {
    const { menu, setMenu } = useContext(MenuContext)
    const [toogleCol, setToogleCol] = useState(false)
    const [selectedData, setSelectedData] = useState<SelectedData[]>([])
    const [sent, setSent] = useState(false)


    function handleExcel() {
        setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
        try {
            if (selectedData.length === 0)
                return alert("please select some rows")
            ExportToExcel(selectedData, "activities_data")
            setSent(true)
        }
        catch (err) {
            setSent(false)
        }

    }

    // refine data
    useEffect(() => {
        let data: SelectedData[] = []
        selectedFlatRows.map((item) => {
            let activity = item.original
            return data.push({
                activity_type: activity.activity_type,
                description: activity.description,
                remarks: activity.remarks,
                activity_owner: activity.activity_owner.username,
                resource_id: activity.resource_id,
                resource_type: activity.resource_type,
                status_changed_by: activity.status_changed_by.username,
                updated_by: activity.updated_by.username,
                updated_at: new Date(activity.updated_at).toLocaleDateString(),
                created_at: new Date(activity.created_at).toLocaleDateString(),
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

            <IconButton size="medium"
                onClick={(e) => setMenu({ type: MenuActions.activity_table_menu, payload: { type: MenuActions.activity_table_menu, anchorEl: e.currentTarget } })
                }
            >
                <MenuIcon />
            </IconButton>
            <ToogleColumns columns={columns} open={toogleCol} handleClose={() =>
                setToogleCol(false)
            } />
            <Menu
                anchorEl={menu.anchorEl}
                open={Boolean(menu.type === MenuActions.activity_table_menu)}
                onClose={(e) => setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }
                TransitionComponent={Fade}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >

                <MenuItem onClick={() => {
                    setToogleCol(true)
                    setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }}
                >Show and hide columns</MenuItem>
                <MenuItem onClick={handleExcel}
                >Export To Excel</MenuItem>
            </Menu>
        </>
    )
}

export default TableMenu
