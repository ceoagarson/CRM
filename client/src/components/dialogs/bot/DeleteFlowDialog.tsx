import { useContext } from 'react'
import { DestroyFlow } from '../../../services/BotServices'
import { AxiosResponse } from 'axios'
import { BackendError } from '../../../types'
import { useMutation } from 'react-query'
import { BotChoiceActions, ChoiceContext } from '../../../contexts/dialogContext'
import { Button, Dialog, Snackbar } from '@mui/material'
import { IFlow } from '../../../types/bot/flow.types'

function DeleteFlowDialog({ flow }: { flow: IFlow }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    const { mutate, isSuccess, isLoading, isError, error } = useMutation
        <AxiosResponse<IFlow>,
            BackendError,
            string
        >(DestroyFlow)

    return (
        <Dialog fullScreen open={choice === BotChoiceActions.delete_flow ? true : false}
            onClose={() => setChoice({ type: BotChoiceActions.close_bot })}
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
            <div className="modal-header">
                <h5 className='modal-title'>
                    {`This will permanently delete this ${flow.flow_name}`}
                </h5>
            </div>
            <div className='p-2 d-flex justify-content-end gap-2'>
                <Button onClick={() => setChoice({ type: BotChoiceActions.close_bot })}>Cancel</Button>
                <Button variant="outlined" color="error" onClick={() => {
                    if (flow && flow._id) mutate(flow._id)
                    setChoice({ type: BotChoiceActions.close_bot })
                }
                }
                    disabled={isLoading}>Delete</Button>
            </div>
        </Dialog>
    )
}

export default DeleteFlowDialog