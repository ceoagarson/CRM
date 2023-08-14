import { useContext, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { BackendError } from '../../../types'
import { UpdateCustomerName } from '../../../services/BotServices'
import { Button, Dialog, DialogContent, DialogTitle, Snackbar, TextField } from '@mui/material'
import { BotChoiceActions, ChoiceContext } from '../../../contexts/dialogContext'
import { ITracker } from '../../../types/bot/flow.types'

type Props = {
    tracker: ITracker
}
function UpdateTrackerDialog({ tracker }: Props) {
    const { choice, setChoice } = useContext(ChoiceContext)
    const { mutate, isSuccess, isLoading, isError, error } = useMutation
        <AxiosResponse<ITracker>,
            BackendError,
            { id: string, body: { customer_name: string } }
        >(UpdateCustomerName)

    const formik = useFormik({
        initialValues: {
            customer_name: tracker.customer_name,
        },
        validationSchema: Yup.object({
            customer_name: Yup.string()
                .min(4, 'Must be 4 characters or more')
                .required("name is required")

        }),
        onSubmit: (values) => {
            if (tracker && tracker._id)
                mutate({
                    id: tracker._id,
                    body: { customer_name: values.customer_name }
                })
        },
    });

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                setChoice({ type: BotChoiceActions.close_bot })
            }, 400)
        }
    }, [isSuccess, setChoice])
    return (

        <Dialog open={choice === BotChoiceActions.update_tracker ? true : false}
            onClose={() => setChoice({ type: BotChoiceActions.close_bot })}
        >
            <form onSubmit={formik.handleSubmit}>
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
                            message=" name saved in the store"
                        />
                    ) : null
                }

               
                <DialogContent>
                    < TextField
                        variant='standard'
                        focused
                        error={
                            formik.touched.customer_name && formik.errors.customer_name ? true : false
                        }
                        id="customer_name"
                        label="Customer Name"
                        fullWidth
                        helperText={
                            formik.touched.customer_name && formik.errors.customer_name ? formik.errors.customer_name : ""
                        }
                        {...formik.getFieldProps('customer_name')}
                    />
                    <Button sx={{mt:2}}fullWidth variant="contained" type="submit"
                        disabled={isLoading}
                    >{isLoading ? "saving..." : "Change"}</Button>
                </DialogContent>
            </form>
        </Dialog >
    )
}

export default UpdateTrackerDialog