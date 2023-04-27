import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { useContext } from 'react'
import { ChoiceContext, CategoryChoiceActions  } from '../../../contexts/dialogContext'
import NewCategoryForm from '../../forms/categories/NewCategoryForm'


function NewCategoryDialog() {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <Dialog open={choice === CategoryChoiceActions.new_category ? true : false}
            onClose={() => setChoice({ type: CategoryChoiceActions.close })}
        >
            <DialogTitle textAlign="center">
                New Category
            </DialogTitle>
            <DialogContent>
                <NewCategoryForm/>
            </DialogContent>
        </Dialog >
    )
}

export default NewCategoryDialog
