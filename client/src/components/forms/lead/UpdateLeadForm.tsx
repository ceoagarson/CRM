import { Alert, Button, CircularProgress, Stack, TextField } from '@mui/material';
import { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { useEffect, useContext } from 'react';
import { useMutation } from 'react-query';
import * as Yup from "yup"
import { queryClient } from '../../..';
import { LeadChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { UpdateLead } from '../../../services/LeadsServices';
import { BackendError } from '../../../types';
import { ILead } from '../../../types/lead.type';
import { Countries } from '../../../utils/countries';
import { Source } from '../../../utils/Source';
import { States } from '../../../utils/states';
import { Cities } from '../../../utils/cities';
import { useLeadFields } from '../../hooks/LeadFieldsHook';
import { IUser } from '../../../types/user.type';

export type TformData = {
  name: string,
  customer_name: string,
  customer_designation: string,
  mobile: string,
  email: string
  city: string,
  state: string,
  country: string,
  address: string,
  remark: string,
  work_description: string,
  turnover: string,
  lead_type: string,
  stage: string,
  alternate_mobile1: string,
  alternate_mobile2: string,
  alternate_email: string,
  lead_owners: string[],
  lead_source: string,
}

function UpdateLeadForm({ lead, users }: { lead: ILead, users: IUser[] }) {
  const { hiddenFields, readonlyFields } = useLeadFields()
  const { mutate, isLoading, isSuccess, isError, error } = useMutation
    <AxiosResponse<ILead>, BackendError, {
      id: string,
      body: TformData
    }>
    (UpdateLead, {
      onSuccess: () => queryClient.invalidateQueries('leads')
    })

  const { setChoice } = useContext(ChoiceContext)
  const formik = useFormik<TformData>({
    initialValues: {
      name: lead.name,
      customer_name: lead.customer_name,
      customer_designation: lead.customer_designation,
      mobile: String(lead.mobile),
      email: lead.email,
      city: lead.city,
      state: lead.state,
      country: lead.country,
      address: lead.address,
      remark: lead.remarks.length ? lead.remarks[lead.remarks.length - 1].remark : "",
      work_description: lead.work_description,
      turnover: String(lead.turnover),
      lead_type: lead.lead_type,
      stage: lead.stage,
      alternate_mobile1: String(lead.alternate_mobile1),
      alternate_mobile2: String(lead.alternate_mobile2),
      alternate_email: lead.alternate_email,
      lead_source: lead.lead_source,
      lead_owners: lead.lead_owners.map((owner) => {
        return owner._id
      })
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Required field')
        .min(4, 'Must be 4 characters or more')
        .max(30, 'Must be 30 characters or less'),
      lead_owners: Yup.array()
        .required('Required field'),
      email: Yup.string()
        .email('provide a valid email id')
        .required('Required field'),
      alternate_email: Yup.string()
        .email('provide a valid email id'),
      customer_name: Yup.string()
        .min(4, 'Must be 4 characters or more')
        .max(30, 'Must be 30 characters or less'),
      customer_designation: Yup.string(),
      city: Yup.string().required("required field")
        .min(3, 'Must be 3 characters or more')
        .max(30, 'Must be 30 characters or less'),
      state: Yup.string().required("required field")
        .min(3, 'Must be 3 characters or more')
        .max(30, 'Must be 30 characters or less'),
      lead_type: Yup.string().required("required field"),
      turnover: Yup.string(),
      stage: Yup.string().required("required field"),
      lead_source: Yup.string().required("required field"),
      country: Yup.string().required("required field"),
      work_description: Yup.string().required("required field")
        .min(20, 'Must be 20 characters or more')
        .max(1000, 'Must be 1000 characters or less'),
      address: Yup.string().required("required field")
        .min(10, 'Must be 10 characters or more')
        .max(300, 'Must be 300 characters or less'),
      remark: Yup.string()
        .min(10, 'Must be 10 characters or more')
        .max(500, 'Must be 500 characters or less'),
      mobile: Yup.string()
        .min(10, 'Must be 10 digits')
        .max(10, 'Must be 10 digits')
        .required('Required field')
    }),
    onSubmit: (values: TformData) => {
      let leadData: TformData = {
        customer_name: values.customer_name,
        customer_designation: values.customer_designation,
        mobile: values.mobile,
        email: values.email,
        city: values.city,
        state: values.state,
        country: values.country,
        address: values.address,
        remark: values.remark,
        work_description: values.work_description,
        turnover: values.turnover,
        lead_type: values.lead_type,
        stage: values.stage,
        alternate_mobile1: values.alternate_mobile1,
        alternate_mobile2: values.alternate_mobile2,
        alternate_email: values.alternate_email,
        lead_source: values.lead_source,
        name: values.name,
        lead_owners: values.lead_owners
      }

      mutate({
        id: lead._id,
        body: leadData
      })
    }
  });
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setChoice({ type: LeadChoiceActions.close })
      }, 1000)
    }
  }, [isSuccess, setChoice])
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack
        gap={2}
        py={2}
      >
        {/* name */}
        {
          !hiddenFields?.includes('name') ?
            <TextField
              autoFocus
              variant='standard'
              fullWidth
              disabled={Boolean(readonlyFields?.includes('name'))}
              required
              error={
                formik.touched.name && formik.errors.name ? true : false
              }
              id="name"
              label="Lead Name"
              helperText={
                formik.touched.name && formik.errors.name ? formik.errors.name : ""
              }
              {...formik.getFieldProps('name')}
            />
            : null
        }

        {/* customer name */}
        {

          !hiddenFields?.includes('customer_name') ?
            < TextField
              variant='standard'
              fullWidth
              disabled={Boolean(readonlyFields?.includes('customer_name'))}
              error={
                formik.touched.customer_name && formik.errors.customer_name ? true : false
              }
              id="customer_name"
              label="Customer Name"
              helperText={
                formik.touched.customer_name && formik.errors.customer_name ? formik.errors.customer_name : ""
              }
              {...formik.getFieldProps('customer_name')}
            />

            : null
        }
        {/* customer designiation */}

        {
          !hiddenFields?.includes('customer_designation') ?
            < TextField
              variant='standard'
              fullWidth
              disabled={Boolean(readonlyFields?.includes('customer_designation'))}

              error={
                formik.touched.customer_designation && formik.errors.customer_designation ? true : false
              }
              id="customer_designation"
              label="Customer Designation"
              helperText={
                formik.touched.customer_designation && formik.errors.customer_designation ? formik.errors.customer_designation : ""
              }
              {...formik.getFieldProps('customer_designation')}
            />
            : null
        }
        {/* mobile */}

        {
          !hiddenFields?.includes('mobile') ?
            < TextField
              variant='standard'
              disabled={Boolean(readonlyFields?.includes('mobile'))}
              type="number"
              required
              error={
                formik.touched.mobile && formik.errors.mobile ? true : false
              }
              id="mobile"
              label="Mobile"
              fullWidth
              helperText={
                formik.touched.mobile && formik.errors.mobile ? formik.errors.mobile : ""
              }
              {...formik.getFieldProps('mobile')}
            />
            : null
        }
        {/* email */}

        {
          !hiddenFields?.includes('email') ?
            < TextField
              variant='standard'
              required
              fullWidth
              disabled={Boolean(readonlyFields?.includes('email'))}

              error={
                formik.touched.email && formik.errors.email ? true : false
              }
              id="email"
              label="Email"
              helperText={
                formik.touched.email && formik.errors.email ? formik.errors.email : ""
              }
              {...formik.getFieldProps('email')}
            />
            : null
        }
        {/* alternate mobile */}

        {
          !hiddenFields?.includes('alternate_mobile1') ?

            < TextField
              variant='standard'
              fullWidth
              disabled={Boolean(readonlyFields?.includes('alternate_mobile1'))}
              type="number"
              error={
                formik.touched.alternate_mobile1 && formik.errors.alternate_mobile1 ? true : false
              }
              id="alternate_mobile1"
              label="Alternate Mobile1"
              helperText={
                formik.touched.alternate_mobile1 && formik.errors.alternate_mobile1 ? formik.errors.alternate_mobile1 : ""
              }
              {...formik.getFieldProps('alternate_mobile1')}
            />
            : null
        }
        {/* alternate mobile */}

        {
          !hiddenFields?.includes('alternate_mobile2') ?

            < TextField
              variant='standard'
              fullWidth
              disabled={Boolean(readonlyFields?.includes('alternate_mobile2'))}
              type="number"
              error={
                formik.touched.alternate_mobile2 && formik.errors.alternate_mobile2 ? true : false
              }
              id="alternate_mobile2"
              label="Alternate Mobile2"
              helperText={
                formik.touched.alternate_mobile2 && formik.errors.alternate_mobile2 ? formik.errors.alternate_mobile2 : ""
              }
              {...formik.getFieldProps('alternate_mobile2')}
            />
            : null
        }
        {/* turnover */}
        {
          !hiddenFields?.includes('turnover') ?
            <TextField
              variant='standard'
              fullWidth
              error={
                formik.touched.turnover && formik.errors.turnover ? true : false
              }
              disabled={Boolean(readonlyFields?.includes('turnover'))}

              id="turnover"
              label="TurnOver"
              helperText={
                formik.touched.turnover && formik.errors.turnover ? formik.errors.turnover : ""
              }
              {...formik.getFieldProps('turnover')}
            />
            : null
        }
        {/* alternate_email */}

        {
          !hiddenFields?.includes('alternate_email') ?

            < TextField
              variant='standard'
              fullWidth
              disabled={Boolean(readonlyFields?.includes('alternate_email'))}

              error={
                formik.touched.alternate_email && formik.errors.alternate_email ? true : false
              }
              id="alternate_email"
              label="Alternate Email"
              helperText={
                formik.touched.alternate_email && formik.errors.alternate_email ? formik.errors.alternate_email : ""
              }
              {...formik.getFieldProps('alternate_email')}
            />
            : null
        }
        {/* city */}

        {
          !hiddenFields?.includes('city') ?
            < TextField
              variant='standard'
              select
              disabled={Boolean(readonlyFields?.includes('city'))}

              SelectProps={{
                native: true
              }}
              focused
              required
              error={
                formik.touched.city && formik.errors.city ? true : false
              }
              id="city"
              label="City"
              fullWidth
              helperText={
                formik.touched.city && formik.errors.city ? formik.errors.city : ""
              }
              {...formik.getFieldProps('city')}
            >
              <option value="">
              </option>
              {
                Cities.map((city, index: number) => {
                  return (<option key={index} value={city}>
                    {city}
                  </option>)
                })
              }
            </TextField>
            : null
        }
        {/* state */}

        {
          !hiddenFields?.includes('state') ?
            < TextField
              variant='standard'
              select
              disabled={Boolean(readonlyFields?.includes('state'))}

              SelectProps={{
                native: true
              }}
              focused
              required
              error={
                formik.touched.state && formik.errors.state ? true : false
              }
              id="state"
              label="State"
              fullWidth
              helperText={
                formik.touched.state && formik.errors.state ? formik.errors.state : ""
              }
              {...formik.getFieldProps('state')}
            >
              <option value="">

              </option>
              {
                States.map(state => {
                  return (<option key={state.code} value={state.state}>
                    {state.state}
                  </option>)
                })
              }
            </TextField>
            : null
        }
        {/* stage */}

        {
          !hiddenFields?.includes('stage') ?
            < TextField
              variant='standard'
              disabled={Boolean(readonlyFields?.includes('stage'))}
              select
              SelectProps={{
                native: true
              }}
              focused
              required
              error={
                formik.touched.stage && formik.errors.stage ? true : false
              }
              id="stage"
              label="Stage"
              fullWidth
              helperText={
                formik.touched.stage && formik.errors.stage ? formik.errors.stage : ""
              }
              {...formik.getFieldProps('stage')}
            >
              <option value="">

              </option>
              <option value="open">
                open
              </option>
              <option value="won">
                won
              </option>
              <option value="won dealer">
                won dealer
              </option>
              <option value="lost">
                lost
              </option>
              <option value="useless">
                useless
              </option>
              <option value="potential">
                potential
              </option>
            </TextField>
            : null
        }
        {/* lead type */}

        {
          !hiddenFields?.includes('lead_type') ?

            < TextField
              variant='standard'
              disabled={Boolean(readonlyFields?.includes('lead_type'))}

              select
              SelectProps={{
                native: true
              }}
              focused
              required
              error={
                formik.touched.lead_type && formik.errors.lead_type ? true : false
              }

              id="lead_type"
              label="Lead Type"
              fullWidth
              helperText={
                formik.touched.lead_type && formik.errors.lead_type ? formik.errors.lead_type : ""
              }
              {...formik.getFieldProps('lead_type')}
            >
              <option value="">

              </option>
              <option value="wholesale">
                wholesale
              </option>
              <option value="retail">
                retail
              </option>
              <option value="company">
                company
              </option>
              <option value="mixed">
                Wholesale + Retail
              </option>
            </TextField>

            : null
        }
        {/* lead_source */}

        {
          !hiddenFields?.includes('lead_source') ?
            < TextField
              variant='standard'
              select
              disabled={Boolean(readonlyFields?.includes('lead_source'))}

              SelectProps={{
                native: true
              }}
              focused
              required
              error={
                formik.touched.lead_source && formik.errors.lead_source ? true : false
              }
              id="lead_source"
              label="Lead Source"
              fullWidth
              helperText={
                formik.touched.lead_source && formik.errors.lead_source ? formik.errors.lead_source : ""
              }
              {...formik.getFieldProps('lead_source')}
            >
              <option value="">
              </option>
              {

                Source.map(source => {
                  return (
                    <option key={source} value={source}>
                      {source}
                    </option>)
                })
              }
            </TextField>
            : null
        }
        {/* country */}

        {
          !hiddenFields?.includes('country') ?

            < TextField
              variant='standard'
              disabled={Boolean(readonlyFields?.includes('country'))}
              select
              SelectProps={{
                native: true
              }}
              focused
              required
              error={
                formik.touched.country && formik.errors.country ? true : false
              }
              id="country"
              label="country"
              fullWidth
              helperText={
                formik.touched.country && formik.errors.country ? formik.errors.country : ""
              }
              {...formik.getFieldProps('country')}
            >
              {
                Countries.map(country => {
                  return (<option key={country.unicode} value={country.name}>
                    {country.name}
                  </option>)
                })
              }
            </TextField>
            : null
        }
        {/* address */}
        {
          !hiddenFields?.includes('address') ?
            < TextField
              disabled={Boolean(readonlyFields?.includes('address'))}

              variant='standard'
              multiline
              minRows={2}
              required
              error={
                formik.touched.address && formik.errors.address ? true : false
              }
              id="address"
              label="Address"
              fullWidth
              helperText={
                formik.touched.address && formik.errors.address ? formik.errors.address : ""
              }
              {...formik.getFieldProps('address')}
            />
            : null
        }
        {/* work_description */}

        {
          !hiddenFields?.includes('work_description') ?

            < TextField
              variant='standard'
              multiline
              minRows={2}
              disabled={Boolean(readonlyFields?.includes('work_description'))}

              required
              error={
                formik.touched.work_description && formik.errors.work_description ? true : false
              }
              id="work_description"
              label="Work Description"
              fullWidth
              helperText={
                formik.touched.work_description && formik.errors.work_description ? formik.errors.work_description : ""
              }
              {...formik.getFieldProps('work_description')}
            />
            : null
        }

        {/* lead owners */}

        {
          !hiddenFields?.includes('lead_owners') ?

            < TextField
              variant='standard'
              disabled={Boolean(readonlyFields?.includes('lead_owners'))}
              select
              SelectProps={{
                native: true,
                multiple: true
              }}
              focused
              required
              error={
                formik.touched.lead_owners && formik.errors.lead_owners ? true : false
              }
              id="lead_owners"
              label="Lead Owners"
              fullWidth
              helperText={
                formik.touched.lead_owners && formik.errors.lead_owners ? formik.errors.lead_owners : ""
              }
              {...formik.getFieldProps('lead_owners')}
            >
              {
                lead.lead_owners.map(owner => {
                  return (<option key={owner._id} value={owner._id}>
                    {owner.username}
                  </option>)
                })
              }
              {
                users.map((user, index) => {
                  let leadowners = lead.lead_owners.map(owner => {
                    return owner.username
                  })
                  if (!leadowners.includes(user.username)) {
                    return (<option key={index} value={user._id}>
                      {user.username}
                    </option>)
                  }
                  else return null
                })
              }
            </TextField>
            : null
        }
        {/* remark */}

        {
          !hiddenFields?.includes('remarks') ?
            < TextField
              variant='standard'
              multiline
              disabled={Boolean(readonlyFields?.includes('remarks'))}

              minRows={2}
              error={
                formik.touched.remark && formik.errors.remark ? true : false
              }
              id="remark"
              label="Remark"
              fullWidth
              helperText={
                formik.touched.remark && formik.errors.remark ? formik.errors.remark : ""
              }
              {...formik.getFieldProps('remark')}
            />
            : null
        }

      </Stack>
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
            lead updated
          </Alert>
        ) : null
      }
      <Button variant="contained" color="primary" type="submit"
        disabled={Boolean(isLoading)}
        fullWidth>{Boolean(isLoading) ? <CircularProgress /> : "Update Lead"}
      </Button>
    </form>
  )
}

export default UpdateLeadForm
