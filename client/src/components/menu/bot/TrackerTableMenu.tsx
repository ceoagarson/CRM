import { Fade, IconButton, Menu, MenuItem, Snackbar } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { Menu as MenuIcon } from '@mui/icons-material';
import { MenuActions, MenuContext } from '../../../contexts/menuContext';
import ExportToExcel from '../../../utils/ExportToExcel';
import { UserContext } from '../../../contexts/userContext';
import { useBotFields } from '../../hooks/BotFieldsHook';
import { ITracker } from '../../../types/bot/flow.types';

type ITrackerTemplate = {
    flow_name: string,
    customer_phone: string,
    customer_name: string,
    last_interaction: Date,
    connected_numbers: string,
    connected_users: string
}

type Props = {
    selectedFlatRows: ITracker[]
}

function TrackerTableMenu({ selectedFlatRows }: Props) {
    const { menu, setMenu } = useContext(MenuContext)
    const [selectedData, setSelectedData] = useState<ITrackerTemplate[]>([])
    const [sent, setSent] = useState(false)
    const { hiddenFields, readonlyFields } = useBotFields()
    const { user } = useContext(UserContext)
    function handleExcel() {
        setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
        try {
            if (DataTransfer.length === 0) {
                alert("select at least one row")
                return
            }
            ExportToExcel(selectedData, "trackers_data")
            setSent(true)
        }
        catch (err) {
            console.log(err)
            setSent(false)
        }
    }

    // refine data
    useEffect(() => {
        let data: ITrackerTemplate[] = []
        selectedFlatRows.map((tracker) => {
            return data.push(

                {
                    flow_name: tracker.flow.flow_name,
                    customer_phone: tracker.phone_number,
                    customer_name: tracker.customer_name,
                    last_interaction: new Date(tracker.updated_at),
                    connected_numbers: tracker.flow.connected_users && tracker.flow.connected_users.map((user) => {
                        return user.username + ","
                    }).toString() || "",
                    connected_users: tracker.flow.connected_users && tracker.flow.connected_users.map((user) => {
                        return user.connected_number + ","
                    }).toString() || ""
                })
        })
        if (data.length > 0)
            setSelectedData(data)
    }, [selectedFlatRows])


    return (
        <>

            {/* export snak bar */}
            <Snackbar
                open={sent}
                autoHideDuration={6000}
                onClose={() => setSent(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                message="File Exported Successfuly"
            />


            <IconButton size="medium"
                onClick={(e) => setMenu({ type: MenuActions.tracker_table_menu, payload: { type: MenuActions.tracker_table_menu, anchorEl: e.currentTarget } })
                }
                sx={{ border: 1, borderRadius: 2, marginLeft: 2 }}
            >
                <MenuIcon />
            </IconButton>

            <Menu
                anchorEl={menu.anchorEl}
                open={Boolean(menu.type === MenuActions.tracker_table_menu)}
                onClose={() => setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }
                TransitionComponent={Fade}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{ borderRadius: 2 }}
            >


                {!hiddenFields?.includes('export_to_excel') &&
                    < MenuItem onClick={handleExcel}
                        disabled={readonlyFields?.includes('export_to_excel')}
                    >Export To Excel</MenuItem>
                }

            </Menu >
        </>
    )
}

export default TrackerTableMenu
