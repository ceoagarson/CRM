import { GetLeadFieldsUpdatable, UpdateLeadFieldsUpdatable } from '../../services/LeadsServices'
import { AxiosResponse } from 'axios'
import { ILeadUpdatableField } from '../../types/leads/lead.updatable_field.type'
import { useMutation, useQuery } from 'react-query'
import { BackendError } from '../../types'
import { useEffect, useState } from 'react'
import { Button, Grid, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { Delete } from '@mui/icons-material'


function UpdateLeadFieldsPage() {
    const { data: updated_fields, mutate, isLoading, isSuccess } = useMutation
        <AxiosResponse<ILeadUpdatableField>, BackendError, {
            stages: string[],
            lead_types: string[],
            lead_sources: string[],
        }>(UpdateLeadFieldsUpdatable)

    const { data, isSuccess: isFieldsSuccess } = useQuery<AxiosResponse<ILeadUpdatableField>, BackendError>("updateble-lead-leads", GetLeadFieldsUpdatable, {
        staleTime: 10000
    })

    const [fields, setFields] = useState<ILeadUpdatableField>()

    const [stage, setStage] = useState<string>()
    const [type, setType] = useState<string>()
    const [source, setSource] = useState<string>()


    useEffect(() => {
        if (isFieldsSuccess) {
            setFields(data.data)
        }
    }, [isFieldsSuccess, data])


    
    useEffect(() => {
        if (isSuccess) {
            setFields(updated_fields?.data)
        }
    }, [isSuccess, updated_fields])
    console.log(fields)
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
                            <TextField size="small" placeholder='Add new stage' onChange={(e) => setStage(e.target.value)}>
                            </TextField>
                            <Button color="inherit" sx={{ borderRadius: 2 }} variant="contained" onClick={() => {
                                if (stage && fields?.stages)
                                    setFields({
                                        ...fields,
                                        stages: [...fields.stages, stage]
                                    })
                            }}>+</Button>
                        </Stack>
                        {fields && fields.stages && fields.stages?.map((stage, index) => {
                            return (
                                <Stack key={index} spacing={2} direction="row" alignItems="center">
                                    <TextField disabled defaultValue={stage}>
                                    </TextField>
                                    <Button color="error" sx={{ borderRadius: 2 }} variant="contained" onClick={() => {
                                        if (stage && fields?.stages)
                                            setFields({
                                                ...fields,
                                                stages: fields.stages.filter((item) => { return item !== stage })
                                            })
                                    }}>
                                        <Delete />
                                    </Button>
                                </Stack>
                            )
                        })}
                    </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Stack spacing={2} p={1} direction="column">
                        <Typography variant="button" sx={{ fontWeight: 'bold' }}>Lead Types</Typography>
                        <Stack spacing={2} direction="row" alignItems="center">
                            <TextField size="small" placeholder='Add new Lead Type'
                                onChange={(e) => setType(e.target.value)}
                            >
                            </TextField>
                            <Button color="inherit" sx={{ borderRadius: 2 }} variant="contained" onClick={() => {
                                if (type && fields?.lead_types)
                                    setFields({
                                        ...fields,
                                        lead_types: [...fields.lead_types, type]
                                    })
                            }}>
                                +
                            </Button>
                        </Stack>
                        {fields && fields?.lead_types && fields.lead_types.map((type, index) => {
                            return (
                                <Stack key={index} spacing={2} direction="row" alignItems="center">
                                    <TextField disabled defaultValue={type}>
                                    </TextField>
                                    <Button color="error" sx={{ borderRadius: 2 }} variant="contained" onClick={() => {
                                        if (type && fields?.lead_types)
                                            setFields({
                                                ...fields,
                                                lead_types: fields.lead_types.filter((item) => { return item !== type })
                                            })


                                    }}>
                                        <Delete />
                                    </Button>
                                </Stack>
                            )
                        })}
                    </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Stack spacing={2} p={1} direction="column">
                        <Typography variant="button" sx={{ fontWeight: 'bold' }}>Lead Sources</Typography>
                        <Stack spacing={2} direction="row" alignItems="center">
                            <TextField size="small" placeholder='Add new Lead SOurce'
                                onChange={(e) => setSource(e.target.value)}
                            >
                            </TextField>
                            <Button color="inherit" sx={{ borderRadius: 2 }} variant="contained" onClick={() => {
                                if (source && fields?.lead_sources)
                                    setFields({
                                        ...fields,
                                        lead_sources: [...fields.lead_sources, source]
                                    })
                            }}>+</Button>
                        </Stack>
                        {fields && fields?.lead_sources && fields.lead_sources.map((field, index) => {
                            return (
                                <Stack key={index} spacing={2} direction="row" alignItems="center">
                                    <TextField disabled defaultValue={field}>
                                    </TextField>
                                    <Button color="error" sx={{ borderRadius: 2 }} variant="contained" onClick={() => {
                                        if (field && fields?.lead_sources)
                                            setFields({
                                                ...fields,
                                                lead_sources: fields.lead_sources.filter((source) => { return source !== field })
                                            })
                                    }}>
                                        <Delete />
                                    </Button>
                                </Stack>
                            )
                        })}
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default UpdateLeadFieldsPage