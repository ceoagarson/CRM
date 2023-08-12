import { GetLeadFieldsUpdatable, UpdateLeadFieldsUpdatable } from '../services/LeadsServices'
import { AxiosResponse } from 'axios'
import { ILeadUpdatableField } from '../types/models/lead.updatable_field.type'
import { useMutation, useQuery } from 'react-query'
import { BackendError } from '../types'
import { useEffect, useState } from 'react'
import { Button, Snackbar, Stack } from '@mui/material'
import { styled } from 'styled-components'

const StyledInput = styled.input`
`
function UpdateLeadFieldsPage() {
    const { data: updated_fields, mutate, isLoading, isSuccess } = useMutation
        <AxiosResponse<ILeadUpdatableField>, BackendError, {
            stages: string[],
            lead_types: string[],
            lead_sources: string[],
        }>(UpdateLeadFieldsUpdatable)

    const { data } = useQuery<AxiosResponse<ILeadUpdatableField>, BackendError>("updateble-lead-leads", GetLeadFieldsUpdatable)

    const [origfields, setOrigfields] = useState<ILeadUpdatableField | undefined>(data?.data)

    const [fields, setFields] = useState({
        stages: origfields?.stages || [],
        lead_types: origfields?.lead_types || [],
        lead_sources: origfields?.lead_sources || []
    })

    useEffect(() => {
        if (isSuccess) {
            setOrigfields(data?.data)
        }
    }, [isSuccess, data])

    return (
        <>

            {/* export snak bar */}
            <Snackbar
                open={isSuccess}
                autoHideDuration={6000}
                onClose={() => { return null }}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                message="Fields Saved Successfuly"
            />

            <Button fullWidth size="large" variant='contained' color="inherit" aria-multiselectable onClick={() => {
                if (fields) {
                    mutate(fields)
                }
            }}

                disabled={isLoading}
            >Save</Button>
            <Stack spacing={2}>
                {fields.stages?.map((field, index) => {
                    return (
                        <StyledInput key={index} defaultValue={field}>
                        </StyledInput>
                    )
                })}
                <div>
                    <StyledInput placeholder='type field'>
                    </StyledInput>
                    <Button onClick={() => {

                    }}>New Stage</Button>
                </div>
            </Stack>

        </>
    )
}

export default UpdateLeadFieldsPage