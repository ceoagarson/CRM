import { GetLeadFieldsUpdatable, UpdateLeadFieldsUpdatable } from '../services/LeadsServices'
import { AxiosResponse } from 'axios'
import { ILeadUpdatableField } from '../types/leads/lead.updatable_field.type'
import { useMutation, useQuery } from 'react-query'
import { BackendError } from '../types'
import { useEffect, useState } from 'react'
import { Button, Grid, Snackbar, Stack, TextField, Typography } from '@mui/material'


function UpdateLeadFieldsPage() {
    const { data: updated_fields, mutate, isLoading, isSuccess } = useMutation
        <AxiosResponse<ILeadUpdatableField>, BackendError, {
            stages: string[],
            lead_types: string[],
            lead_sources: string[],
        }>(UpdateLeadFieldsUpdatable)

    const { data, isSuccess: isFieldsSuccess } = useQuery<AxiosResponse<ILeadUpdatableField>, BackendError>("updateble-lead-leads", GetLeadFieldsUpdatable)

    const [fields, setFields] = useState<ILeadUpdatableField>()

    const [stages, setStages] = useState(fields?.stages)
    const [types, setTypes] = useState(fields?.lead_types)
    const [sources, setSources] = useState(fields?.lead_sources)


    useEffect(() => {
        if (isFieldsSuccess) {
            setFields(data.data)
            setStages(data.data.stages)
            setTypes(data.data.lead_types)
            setSources(data.data.lead_sources)
        }
    }, [isFieldsSuccess, data])

    useEffect(() => {
        if (isSuccess) {
            setFields(updated_fields?.data)
            setStages(updated_fields.data.stages)
            setTypes(updated_fields.data.lead_types)
            setSources(updated_fields.data.lead_sources)
        }
    }, [isSuccess, updated_fields])
    console.log(stages)
    console.log(types)
    console.log(sources)
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

            <Button size="small" sx={{ position: 'absolute', right: 0, m: 1 }} variant='outlined' color="primary" onClick={() => {
                if (fields) {
                    mutate(fields)
                }
            }}
                disabled={isLoading}
            >
                Save
            </Button>

            {/* grid */}
            <Grid container spacing={2} padding={2}>
                <Grid item xs={12} md={4}>
                    <Stack spacing={2} p={1} direction="column">
                        <Typography variant="button" sx={{ fontWeight: 'bold' }}>Lead Stage</Typography>
                        <Stack spacing={2} direction="row" alignItems="center">
                            <TextField size="small" placeholder='Add new stage'>
                            </TextField>
                            <Button color="inherit" sx={{ borderRadius: 2 }} variant="contained" onClick={() => {

                            }}>+</Button>
                        </Stack>
                        {stages && stages?.map((stage, index) => {
                            return (
                                <TextField key={index} defaultValue={stage}>
                                </TextField>
                            )
                        })}
                    </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Stack spacing={2} p={1} direction="column">
                        <Typography variant="button" sx={{ fontWeight: 'bold' }}>Lead Types</Typography>
                        <Stack spacing={2} direction="row" alignItems="center">
                            <TextField size="small" placeholder='Add new Lead Type'>
                            </TextField>
                            <Button color="inherit" sx={{ borderRadius: 2 }} variant="contained" onClick={() => {

                            }}>+</Button>
                        </Stack>
                        {types && types?.map((type, index) => {
                            return (
                                <TextField key={index} defaultValue={type}>
                                </TextField>
                            )
                        })}
                    </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Stack spacing={2} p={1} direction="column">
                        <Typography variant="button" sx={{ fontWeight: 'bold' }}>Lead Sources</Typography>
                        <Stack spacing={2} direction="row" alignItems="center">
                            <TextField size="small" placeholder='Add new Lead SOurce'>
                            </TextField>
                            <Button color="inherit" sx={{ borderRadius: 2 }} variant="contained" onClick={() => {

                            }}>+</Button>
                        </Stack>
                        {sources && sources?.map((field, index) => {
                            return (
                                <TextField key={index} defaultValue={field}>
                                </TextField>
                            )
                        })}
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default UpdateLeadFieldsPage