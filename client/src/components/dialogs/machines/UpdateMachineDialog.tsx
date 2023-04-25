import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { useContext } from 'react'
import { ChoiceContext, MachineChoiceActions } from '../../../contexts/dialogContext'
import UpdateMachineForm from '../../forms/machines/UpdateMachineForm'
import { IMachine } from '../../../types/production.type'

type Props = {
    machine:IMachine
}

function UpdateMachineDialog({ machine }: Props) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <Dialog open={choice === MachineChoiceActions.update_machine ? true : false}
            onClose={() => setChoice({ type: MachineChoiceActions.close })}
        >
            <DialogTitle textAlign="center">
                Update Machine
            </DialogTitle>
            <DialogContent>
                <UpdateMachineForm machine={machine} />
            </DialogContent>
        </Dialog >
    )
}

export default UpdateMachineDialog
