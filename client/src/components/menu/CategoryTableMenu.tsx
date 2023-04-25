import { Fade, IconButton, Menu, MenuItem, Snackbar } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { Row } from 'react-table';
import { Menu as MenuIcon } from '@mui/icons-material';
import { MenuActions, MenuContext } from '../../contexts/menuContext';
import { ChoiceContext,  CategoryChoiceActions } from '../../contexts/dialogContext';
import ExportToExcel from '../tables/utils/ExportToExcel';
import { ICategory } from '../../types/production.type';
import NewCategoryDialog from '../dialogs/categories/NewCategoryDialog';

type Props = {
    selectedFlatRows: Row<ICategory>[]
}
type SelectedData = {
   category:string
}
function CategoryTableMenu({ selectedFlatRows }: Props) {
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
                category: item.original.category
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
                    setChoice({ type:CategoryChoiceActions.new_category })
                    setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }}
                >New Category</MenuItem>
                <MenuItem onClick={handleExcel}
                >Export To Excel</MenuItem>
            </Menu>
            <NewCategoryDialog />
        </>
    )
}

export default CategoryTableMenu
