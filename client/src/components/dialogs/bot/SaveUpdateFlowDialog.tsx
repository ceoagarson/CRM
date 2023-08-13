import React, { useContext, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { BackendError } from '../../../types'
import { UpdateFlow } from '../../../services/BotServices'
import { Button, Dialog, Snackbar } from '@mui/material'
import { BotChoiceActions, ChoiceContext } from '../../../contexts/dialogContext'
import { IFlow } from '../../../types/bot/flow.types'

type Props = {
    setDisplayUpdateModal: React.Dispatch<React.SetStateAction<boolean>>,
    displayUpdateModal: boolean,
    flow: IFlow
}
function SaveUpdateFlowDialog({ flow, setDisplayUpdateModal, displayUpdateModal }: Props) {
    const { setChoice } = useContext(ChoiceContext)
    const { mutate, isSuccess, isLoading, isError, error } = useMutation
        <AxiosResponse<IFlow>,
            BackendError,
            { id: string, body: IFlow }
        >(UpdateFlow)

    const formik = useFormik<IFlow>({
        initialValues: {
            flow_name: flow.flow_name,
            trigger_keywords: flow.trigger_keywords,
            nodes: flow.nodes,
            edges: flow.edges
        },
        validationSchema: Yup.object({
            flow_name: Yup.string()
                .min(4, 'Must be 4 characters or more')
                .required("name is required")

        }),
        onSubmit: (values: IFlow) => {
            if (flow && flow._id)
                mutate({
                    id: flow._id,
                    body: {
                        ...values,
                        flow_name: values.flow_name,
                        trigger_keywords: values.trigger_keywords,
                        nodes: values.nodes,
                        edges: values.edges
                    }
                })
        },
    });

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                setDisplayUpdateModal(false)
                setChoice({ type: BotChoiceActions.close_bot })
            }, 400)
        }
    }, [isSuccess, setChoice, setDisplayUpdateModal])
    console.log(flow)
    return (

        <Dialog fullScreen open={displayUpdateModal ? true : false}
            onClose={() => setDisplayUpdateModal(false)}
        >
            <form onSubmit={formik.handleSubmit} className='shadow w-100  p-3 bg-body-tertiary border border-1 rounded bg-light align-self-center'>
                <h1 className="d-block fs-4 text-center">Save Flow</h1>
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
                            message=" Flow saved in the store"
                        />
                    ) : null
                }
                <input type="text"
                    {...formik.getFieldProps('flow_name')}
                />
                <p>{formik.touched.flow_name && formik.errors.flow_name ? formik.errors.flow_name : "this is permanent, can not be changed later"}</p>
                <Button variant="contained" fullWidth type="submit"
                    disabled={isLoading}
                >{isLoading ? "updating..." : "Update"}</Button>
            </form>
        </Dialog>
    )
}

export default SaveUpdateFlowDialog