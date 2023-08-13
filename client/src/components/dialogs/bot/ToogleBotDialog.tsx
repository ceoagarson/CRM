import { useContext } from 'react'
import { ToogleBotStatus } from '../../../services/BotServices'
import { AxiosResponse } from 'axios'
import { BackendError } from '../../../types'
import { useMutation } from 'react-query'
import { BotChoiceActions, ChoiceContext } from '../../../contexts/dialogContext'
import { Button, Dialog, Snackbar } from '@mui/material'
import { ITracker } from '../../../types/bot/flow.types'

function ToogleBotDialog({ tracker }: { tracker: ITracker }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    const { mutate, isSuccess, isLoading, isError, error } = useMutation
        <AxiosResponse<ITracker>,
            BackendError,
            { body: { phone_number: string, bot_number: string } }
        >(ToogleBotStatus)

    return (

        <Dialog fullScreen open={choice === BotChoiceActions.toogle_bot_status ? true : false}
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
                        message=" bot status changed for this number"
                    />
                ) : null
            }


            <div className="modal-header">
                <h5 className='modal-title'>
                    {`This will change bot status for this ${tracker.phone_number}`}
                </h5>
            </div>
            <div className='p-2 d-flex justify-content-end gap-2'>
                <Button onClick={() => setChoice({ type: BotChoiceActions.close_bot })}>Cancel</Button>
                <Button variant="outlined" color="error" onClick={() => {
                    if (tracker && tracker._id) mutate({
                        body: { phone_number: tracker.phone_number, bot_number: tracker.bot_number }
                    })
                    setChoice({ type: BotChoiceActions.close_bot })
                }
                }
                    disabled={isLoading}>{tracker.is_active ? "stop" : "start"}</Button>
            </div>
        </Dialog>
    )
}

export default ToogleBotDialog