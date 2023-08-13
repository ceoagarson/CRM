import React, { useContext, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { BackendError } from '../../../types'
import { CreateFlow } from '../../../services/BotServices'
import { BotChoiceActions, ChoiceContext } from '../../../contexts/dialogContext'
import { IFlow } from '../../../types/bot/flow.types'
import { Button, Dialog, Snackbar } from '@mui/material'

type Props = {
    setFlow: React.Dispatch<React.SetStateAction<IFlow | undefined>>,
    flow: IFlow,
    setDisplaySaveModal: React.Dispatch<React.SetStateAction<boolean>>

}
function SaveNewFlowDialog({ flow, setFlow, setDisplaySaveModal }: Props) {
    const { setChoice } = useContext(ChoiceContext)
    const { mutate, isSuccess, isLoading, isError, error } = useMutation
        <AxiosResponse<IFlow>,
            BackendError,
            IFlow
        >(CreateFlow)

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
        onSubmit: (values: {
            flow_name: string,
        }) => {
            mutate({
                ...flow,
                flow_name: values.flow_name
            })
        },
    });

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                setDisplaySaveModal(false)
                setChoice({ type: BotChoiceActions.close_bot })
                setFlow(undefined)
            }, 400)
        }
    }, [isSuccess, setFlow, setChoice, setDisplaySaveModal])
    console.log(flow)
    return (

        <Dialog fullScreen open={flow ? true : false}
            onClose={() => setChoice({ type: BotChoiceActions.close_bot })}
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
                >{isLoading ? "saving..." : "Save"}</Button>
            </form>
        </Dialog>
    )
}

export default SaveNewFlowDialog