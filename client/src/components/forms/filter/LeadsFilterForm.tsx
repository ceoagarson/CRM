import { Button, Stack } from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useMemo } from "react";
import { ChoiceContext, LeadChoiceActions } from "../../../contexts/dialogContext";

type Props = {
    setQuery: React.Dispatch<React.SetStateAction<{
        city: boolean | undefined;
        owner: boolean | undefined;
        searchString: string | undefined;
        isOr: boolean | undefined
    } | undefined>>,
    query: {
        city: boolean | undefined;
        owner: boolean | undefined;
        searchString: string | undefined;
        isOr: boolean | undefined
    } | undefined
}
function LeadsFilterForm({ query, setQuery }: Props) {
    const { setChoice } = useContext(ChoiceContext)
    const data = useMemo(() => query, [query])
    const formik = useFormik({
        initialValues: {
            city: query?.city,
            owner: query?.owner,
            isOr: query?.isOr
        },

        onSubmit: (values) => {
            if (values.city || values.owner)
                setQuery({
                    city: values.city,
                    owner: values.owner,
                    searchString: undefined,
                    isOr: values.isOr
                })
            else
                setQuery(undefined)

            setChoice({ type: LeadChoiceActions.close_lead })
        }
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack
                gap={2}
            >
                <Stack style={{
                    backgroundColor: 'lightgrey',
                    color:'white',
                    padding:2
                }} direction="row" alignItems={"center"} justifyContent={"center"} spacing={1}>
                    <input type="checkbox" defaultChecked={Boolean(data?.isOr)}
                        {...formik.getFieldProps('isOr')}
                        name="isOr" />
                    <label htmlFor="isOr">Or Operation</label>
                </Stack>

                <Stack direction="row" alignItems={"center"} justifyContent={"left"} spacing={1}>
                    <input type="checkbox" defaultChecked={Boolean(data?.city)}
                        {...formik.getFieldProps('city')}
                        name="city" />
                    <label htmlFor="city">city</label>
                </Stack>
                <Stack direction="row" alignItems={"center"} justifyContent={"left"} spacing={1}>
                    <input type="checkbox"
                        {...formik.getFieldProps('owner')}
                        defaultChecked={Boolean(data?.owner)} name="owner" />
                    <label htmlFor="owner">lead owner</label>
                </Stack>

                <Button variant="contained" color="primary" type="submit"
                    fullWidth>
                    Apply
                </Button>
            </Stack>
        </form>
    )
}

export default LeadsFilterForm