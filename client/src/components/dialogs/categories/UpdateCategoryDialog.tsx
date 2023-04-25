import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { useContext } from 'react'
import { ChoiceContext, CategoryChoiceActions } from '../../../contexts/dialogContext'
import { ICategory } from '../../../types/production.type'
import UpdateCategoryForm from '../../forms/categories/UpdateCategoryForm'

type Props = {
    category:ICategory
}

function UpdateCategoryDialog({ category }: Props) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <Dialog open={choice === CategoryChoiceActions.update_category ? true : false}
            onClose={() => setChoice({ type: CategoryChoiceActions.close })}
        >
            <DialogTitle textAlign="center">
                Update Category
            </DialogTitle>
            <DialogContent>
                <UpdateCategoryForm category={category} />
            </DialogContent>
        </Dialog >
    )
}

export default UpdateCategoryDialog
