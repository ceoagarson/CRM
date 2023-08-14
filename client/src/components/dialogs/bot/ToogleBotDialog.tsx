import { useContext } from 'react'
import { ToogleBotStatus } from '../../../services/BotServices'
import { AxiosResponse } from 'axios'
import { BackendError } from '../../../types'
import { useMutation } from 'react-query'
import { BotChoiceActions, ChoiceContext } from '../../../contexts/dialogContext'
import { Button, Dialog, DialogContent, DialogTitle, Snackbar, Stack } from '@mui/material'
import { ITracker } from '../../../types/bot/flow.types'

function ToogleBotDialog({ tracker }: { tracker: ITracker }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    const { mutate, isSuccess, isLoading, isError, error } = useMutation
        <AxiosResponse<ITracker>,
            BackendError,
            { body: { phone_number: string, bot_number: string } }
        >(ToogleBotStatus)

    return (

        <Dialog  open={choice === BotChoiceActions.toogle_bot_status ? true : false}
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

            <DialogTitle>
                {`This will change bot status for this ${tracker.phone_number}`}
            </DialogTitle>
            <DialogContent>
                <Stack direction="row" gap={1} justifyContent={"center"}>
                    <Button variant='contained' onClick={() => setChoice({ type: BotChoiceActions.close_bot })}>Cancel</Button>
                    <Button variant="outlined" color="error" onClick={() => {
                        if (tracker && tracker._id) mutate({
                            body: { phone_number: tracker.phone_number, bot_number: tracker.bot_number }
                        })
                        setChoice({ type: BotChoiceActions.close_bot })
                    }
                    }
                        disabled={isLoading}>{tracker.is_active ? "stop" : "start"}</Button>
                </Stack>
            </DialogContent>
            
        </Dialog>
    )
}

export default ToogleBotDialog