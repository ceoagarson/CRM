import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { useContext } from 'react'
import { ChoiceContext, MachineChoiceActions  } from '../../../contexts/dialogContext'
import NewMachineForm from '../../forms/machines/NewMachineForm';
import { ICategory } from '../../../types/production.type';

type Props = {
    categories: ICategory[]
}

function NewMachineDialog({ categories }:Props) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <Dialog open={choice === MachineChoiceActions.new_machine ? true : false}
            onClose={() => setChoice({ type: MachineChoiceActions.close })}
        >
            <DialogTitle textAlign="center">
                New Machine
            </DialogTitle>
            <DialogContent>
                <NewMachineForm data={categories}/>
            </DialogContent>
        </Dialog >
    )
}

export default NewMachineDialog
