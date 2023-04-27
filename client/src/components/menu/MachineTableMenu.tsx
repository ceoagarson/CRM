import { Fade, IconButton, Menu, MenuItem, Snackbar } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { Row } from 'react-table';
import { Menu as MenuIcon } from '@mui/icons-material';
import { MenuActions, MenuContext } from '../../contexts/menuContext';
import { ChoiceContext,  MachineChoiceActions } from '../../contexts/dialogContext';
import ExportToExcel from '../tables/utils/ExportToExcel';
import NewMachineDialog from '../dialogs/machines/NewMachineDialog';
import { ICategory, IMachine } from '../../types/production.type';

type Props = {
    selectedFlatRows: Row<IMachine>[],
    categories: ICategory[]
}
type SelectedData = {
   machine:string,
   category:string
}
function MachineTableMenu({ selectedFlatRows,categories }: Props) {
    const { menu, setMenu } = useContext(MenuContext)
    const [selectedData, setSelectedData] = useState<SelectedData[]>([])
    const [sent, setSent] = useState(false)
    const { setChoice } = useContext(ChoiceContext)

    function handleExcel() {
        setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
        try {
            if (selectedData.length === 0)
                return alert("please select some rows")
            ExportToExcel(selectedData, "machines_data")
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
            return data.push({
                machine: item.original.name,
                category: item.original.category.category
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
                onClick={(e) => setMenu({ type: MenuActions.machine_table_menu, payload: { type: MenuActions.machine_table_menu, anchorEl: e.currentTarget } })
                }
                sx={{ border: 1, borderRadius: 2, marginLeft: 2 }}
            >
                <MenuIcon />
            </IconButton>

            <Menu
                anchorEl={menu.anchorEl}
                open={Boolean(menu.type === MenuActions.machine_table_menu)}
                onClose={(e) => setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }
                TransitionComponent={Fade}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{ borderRadius: 2 }}
            >
                <MenuItem onClick={() => {
                    setChoice({ type:MachineChoiceActions.new_machine })
                    setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }}
                >New Machine</MenuItem>
                <MenuItem onClick={handleExcel}
                >Export To Excel</MenuItem>
            </Menu>
            <NewMachineDialog categories={categories }/>
        </>
    )
}

export default MachineTableMenu
