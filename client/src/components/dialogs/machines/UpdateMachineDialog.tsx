import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { useContext } from 'react'
import { ChoiceContext, MachineChoiceActions } from '../../../contexts/dialogContext'
import UpdateMachineForm from '../../forms/machines/UpdateMachineForm'
import { ICategory, IMachine } from '../../../types/production.type'

type Props = {
    machine: IMachine,
    categories: ICategory[]
}

function UpdateMachineDialog({ machine, categories }: Props) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <Dialog open={choice === MachineChoiceActions.update_machine ? true : false}
            onClose={() => setChoice({ type: MachineChoiceActions.close })}
        >
            <DialogTitle textAlign="center">
                Update Machine
            </DialogTitle>
            <DialogContent>
                <UpdateMachineForm machine={machine} data={categories} />
            </DialogContent>
        </Dialog >
    )
}

export default UpdateMachineDialog
