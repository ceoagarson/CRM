import { Dialog, DialogContent, DialogTitle, Button, DialogActions, TextField, Alert } from '@mui/material';
import { useContext } from 'react';
import { ChoiceContext, ProductionChoiceActions } from '../../../contexts/dialogContext';
import { AxiosResponse } from 'axios';
import { BackendError } from '../../../types';
import { NewProduction } from '../../../services/ProductionServices';
import { queryClient } from '../../..';
import { useMutation } from 'react-query';
import { useState } from "react"
import { IProduction } from '../../../types/production.type';


function UpdateProductionDialog({ production }: { production :IProduction}) {
    const { choice, setChoice } = useContext(ChoiceContext)
    const [value, setValue] = useState(production.production)
    const { mutate, isLoading,error,isError,isSuccess } = useMutation
        <AxiosResponse<string>, BackendError, {
            machine_id: string, production: string, created_at: Date
        }>
        (NewProduction, {
            onSuccess: () => {
                queryClient.invalidateQueries('productionBydate')
            }
        })

    return (
        <>
            <Dialog open={choice === ProductionChoiceActions.update_production ? true : false}
            >
                <DialogTitle textAlign={"center"}>New Lead</DialogTitle>
                <DialogContent>
                    <TextField
                        defaultValue={production.production}
                        label="Production"
                        type='number'
                        disabled={isLoading}
                        variant='standard'
                        onChange={(e) => setValue(e.currentTarget.value)}
                    />
                </DialogContent>
                {
                    isError ? (
                        <Alert color="error">
                            {error?.response.data.message}
                        </Alert>
                    ) : null
                }
                {
                    isSuccess ? (
                        <Alert color="success">
                          production updated
                        </Alert>
                    ) : null
                }
                <DialogActions sx={{ p: 2 }}>
                    <Button variant='outlined'
                        disabled={isLoading}
                        fullWidth onClick={() => {
                            mutate({
                                machine_id: production.machine._id,
                                production: value,
                                created_at: production.created_at
                            })
                            setChoice({ type: ProductionChoiceActions.close })
                        }
                        }>Update</Button>
                    <Button variant='outlined' fullWidth onClick={() => setChoice({ type: ProductionChoiceActions.close })}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UpdateProductionDialog