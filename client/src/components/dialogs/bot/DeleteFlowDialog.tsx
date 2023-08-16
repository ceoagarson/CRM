import { useContext } from 'react'
import { DestroyFlow } from '../../../services/BotServices'
import { AxiosResponse } from 'axios'
import { BackendError } from '../../../types'
import { useMutation } from 'react-query'
import { BotChoiceActions, ChoiceContext } from '../../../contexts/dialogContext'
import { Button, Dialog, DialogContent, DialogTitle, Snackbar, Stack } from '@mui/material'
import { IFlow } from '../../../types/bot/flow.types'
import { queryClient } from '../../../main'

function DeleteFlowDialog({ flow }: { flow: IFlow }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    const { mutate, isSuccess, isLoading, isError, error } = useMutation
        <AxiosResponse<IFlow>,
            BackendError,
            string
        >(DestroyFlow, { onSuccess: () => queryClient.invalidateQueries('flows') })

    return (
        <Dialog open={choice === BotChoiceActions.delete_flow ? true : false}
            onClose={() => setChoice({ type: BotChoiceActions.close_bot })}
            sx={{ padding: 2 }}
        >

            {
                isError ? (

                    <Snackbar
                        color='danger'
                        open={true}
                        autoHideDuration={6000}
                        onClose={() => null}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        message={error?.response.data.message}
                    />



                ) : null
            }
            {

                isSuccess ? (
                    <Snackbar
                        color='success'
                        open={true}
                        autoHideDuration={6000}
                        onClose={() => null}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        message={'Flow deleted from the store'}
                    />

                ) : null
            }
            <DialogTitle>
                {`This will permanently delete this ${flow.flow_name}`}
            </DialogTitle>
            <DialogContent>
                <Stack direction="row" gap={1} justifyContent={"center"}>
                    <Button variant='contained' onClick={() => setChoice({ type: BotChoiceActions.close_bot })}>Cancel</Button>
                    <Button variant="outlined" color="error" onClick={() => {
                        if (flow && flow._id) mutate(flow._id)
                        setChoice({ type: BotChoiceActions.close_bot })
                    }
                    }
                        disabled={isLoading}>Delete</Button>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteFlowDialog