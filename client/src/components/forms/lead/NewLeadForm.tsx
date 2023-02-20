import { Alert, Avatar, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { useEffect, useContext } from 'react';
import { useMutation } from 'react-query';
import * as Yup from "yup"
import { queryClient } from '../../..';
import { LeadChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { NewLead } from '../../../services/LeadsServices';
import { BackendError, Target } from '../../../types';
import { ILead } from '../../../types/lead.type';
import { Countries } from '../../../utils/countries';
import { Source } from '../../../utils/Source';

type TformData = {
  name: string,
  email: string,
  mobile: string,
  dp: string | Blob | File
  city: string,
  state: string,
  description: string,
  lead_type: "easy" | "medium" | "hard" | ""
  customer_name: string,
  address: string,
  country: string
  alternate_mobile: string,
  alternate_email: string,
  customer_designination: string,
  lead_source: string,
  remarks: string,
}

function NewLeadForm() {
  const { mutate, isLoading, isSuccess, isError, error } = useMutation
    <AxiosResponse<ILead>, BackendError, FormData>
    (NewLead, {
      onSuccess: () => queryClient.invalidateQueries('leads')
    })

  const { setChoice } = useContext(ChoiceContext)

  const formik = useFormik<TformData>({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      dp: "",
      city: "",
      state: "",
      description: "",
      lead_type: "",
      customer_name: "",
      address: "",
      country: "",
      alternate_mobile: "",
      alternate_email: "",
      customer_designination: "",
      lead_source: "",
      remarks: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Required field')
        .min(4, 'Must be 4 characters or more')
        .max(30, 'Must be 30 characters or less'),
      email: Yup.string()
        .email('provide a valid email id')
        .required('Required field'),
      customer_name: Yup.string().required("required field")
        .min(4, 'Must be 4 characters or more')
        .max(30, 'Must be 30 characters or less'),
      customer_designination: Yup.string().required("required field"),
      city: Yup.string().required("required field")
        .min(3, 'Must be 3 characters or more')
        .max(30, 'Must be 30 characters or less'),
      lead_type: Yup.string().required("required field"),
      lead_source: Yup.string().required("required field"),
      country: Yup.string().required("required field"),
      description: Yup.string().required("required field")
        .min(20, 'Must be 20 characters or more')
        .max(1000, 'Must be 1000 characters or less'),
      address: Yup.string()
        .min(10, 'Must be 10 characters or more')
        .max(300, 'Must be 300 characters or less'),
      remarks: Yup.string()
        .min(10, 'Must be 10 characters or more')
        .max(500, 'Must be 500 characters or less'),
      mobile: Yup.string()
        .min(10, 'Must be 10 digits')
        .max(10, 'Must be 10 digits')
        .required('Required field'),
      alternate_mobile: Yup.string()
        .min(10, 'Must be 10 digits')
        .max(10, 'Must be 10 digits'),
      dp: Yup.mixed<File>()
        .test("size", "size is allowed only less than 200kb",
          file => {
            if (file)
              if (!file.size) //file not provided
                return true
              else
                return Boolean(file.size <= 1024 * 200)
            return true
          }
        )
        .test("type", " allowed only .jpg, .jpeg, .png, .gif images",
          file => {
            const Allowed = ["image/png", "image/jpg", "image/jpeg", "image/png", "image/gif"]
            if (file)
              if (!file.size) //file not provided
                return true
              else
                return Boolean(Allowed.includes(file.type))
            return true
          }
        )
    }),
    onSubmit: (values: TformData) => {
      let formdata = new FormData()
      formdata.append("name", values.name)
      formdata.append("email", values.email)
      formdata.append("mobile", values.mobile)
      formdata.append("city", values.city)
      formdata.append("state", values.state)
      formdata.append("description", values.description)
      formdata.append("lead_type", values.lead_type)
      formdata.append("customer_name", values.customer_name)
      formdata.append("address", values.address)
      formdata.append("country", values.country)
      formdata.append("alternate_mobile", values.alternate_mobile)
      formdata.append("alternate_email", values.alternate_email)
      formdata.append("customer_designination", values.customer_designination)
      formdata.append("lead_source", values.lead_source)
      formdata.append("remarks", values.remarks)
      formdata.append("dp", values.dp)
      mutate(formdata)
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
            new lead created successfully
          </Alert>
        ) : null
      }
      <Stack
        gap={2}
        py={2}
      >
        {/* name */}
        <TextField
          autoFocus
          variant='standard'
          focused
          fullWidth
          required
          error={
            formik.touched.name && formik.errors.name ? true : false
          }
          id="name"
          label="Name"
          helperText={
            formik.touched.name && formik.errors.name ? formik.errors.name : ""
          }
          {...formik.getFieldProps('name')}
        />
        {/* customer name */}
        <TextField
          variant='standard'
          focused
          fullWidth
          required
          error={
            formik.touched.customer_name && formik.errors.customer_name ? true : false
          }
          id="customer_name"
          label="customer_name"
          helperText={
            formik.touched.customer_name && formik.errors.customer_name ? formik.errors.customer_name : ""
          }
          {...formik.getFieldProps('customer_name')}
        />

        {/* customer designiation */}
        <TextField
          variant='standard'
          focused
          fullWidth
          required
          error={
            formik.touched.customer_designination && formik.errors.customer_designination ? true : false
          }
          id="customer_designination"
          label="customer_designination"
          helperText={
            formik.touched.customer_designination && formik.errors.customer_designination ? formik.errors.customer_designination : ""
          }
          {...formik.getFieldProps('customer_designination')}
        />
        {/* mobile */}
        <TextField
          variant='standard'
          focused
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


        {/* email */}
        <TextField
          variant='standard'
          focused
          required
          fullWidth
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

        {/* alternate mobile */}
        <TextField
          variant='standard'
          focused
          fullWidth
          error={
            formik.touched.alternate_mobile && formik.errors.alternate_mobile ? true : false
          }
          id="alternate_mobile"
          label="alternate_mobile"
          helperText={
            formik.touched.alternate_mobile && formik.errors.alternate_mobile ? formik.errors.alternate_mobile : ""
          }
          {...formik.getFieldProps('alternate_mobile')}
        />
        {/* alternate_email */}
        <TextField
          variant='standard'
          focused
          fullWidth
          error={
            formik.touched.alternate_email && formik.errors.alternate_email ? true : false
          }
          id="alternate_email"
          label="alternate_email"
          helperText={
            formik.touched.alternate_email && formik.errors.alternate_email ? formik.errors.alternate_email : ""
          }
          {...formik.getFieldProps('alternate_email')}
        />
        {/* city */}
        <TextField
          variant='standard'
          focused
          required
          fullWidth
          error={
            formik.touched.city && formik.errors.city ? true : false
          }
          id="city"
          label="city"
          helperText={
            formik.touched.city && formik.errors.city ? formik.errors.city : ""
          }
          {...formik.getFieldProps('city')}
        />

        {/* lead_type */}
        <TextField
          variant='standard'
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
          label="lead_type"
          fullWidth
          helperText={
            formik.touched.lead_type && formik.errors.lead_type ? formik.errors.lead_type : ""
          }
          {...formik.getFieldProps('lead_type')}
        >
          <option value="">
            <Typography p={2} variant="body2">Select</Typography>
          </option>
          <option value="easy">
            <Typography p={2} variant="body2">easy</Typography>
          </option><option value="medium">
            <Typography p={2} variant="body2">medium</Typography>
          </option><option value="hard">
            <Typography p={2} variant="body2">hard</Typography>
          </option>
        </TextField>

        {/* lead_source */}
        <TextField
          variant='standard'
          select
          SelectProps={{
            native: true
          }}
          focused
          required
          error={
            formik.touched.lead_source && formik.errors.lead_source ? true : false
          }
          id="lead_source"
          label="lead_source"
          fullWidth
          helperText={
            formik.touched.lead_source && formik.errors.lead_source ? formik.errors.lead_source : ""
          }
          {...formik.getFieldProps('lead_source')}
        >
          <option value="">
            <Typography p={2} variant="body2">Select</Typography>
          </option>
          {

            Source.map(source => {
              return (
                <option value={source}>
                  <Typography p={2} variant="body2">{source}</Typography>
                </option>)
            })
          }
        </TextField>
        {/* country */}
        <TextField
          variant='standard'
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
          type="number"
          {...formik.getFieldProps('country')}
        >
          <option value="">
            <Typography p={2} variant="body2">Select Country</Typography>
          </option>
          {
            Countries.map(country => {
              return (<option value={country.name}>
                <Typography p={2} variant="body2">{country.name}</Typography>
              </option>)
            })
          }
        </TextField>

        {/*dp  */}
        <TextField
          fullWidth
          error={
            formik.touched.dp && formik.errors.dp ? true : false
          }
          helperText={
            formik.touched.dp && formik.errors.dp ? String(formik.errors.dp) : ""
          }
          label="Display Picture"
          focused
          variant='standard'
          type="file"
          name="dp"
          onBlur={formik.handleBlur}
          onChange={(e) => {
            e.preventDefault()
            const target: Target = e.currentTarget
            let files = target.files
            if (files) {
              let file = files[0]
              formik.setFieldValue("dp", file)
            }
          }}
        />
        {/* address */}
        <TextField
          variant='standard'
          multiline
          minRows={2}
          focused
          error={
            formik.touched.address && formik.errors.address ? true : false
          }
          id="address"
          label="address"
          fullWidth
          helperText={
            formik.touched.address && formik.errors.address ? formik.errors.address : ""
          }
          type="number"
          {...formik.getFieldProps('address')}
        />
        {/* description */}
        <TextField
          variant='standard'
          multiline
          minRows={2}
          required
          focused
          error={
            formik.touched.description && formik.errors.description ? true : false
          }
          id="description"
          label="description"
          fullWidth
          helperText={
            formik.touched.description && formik.errors.description ? formik.errors.description : ""
          }
          type="number"
          {...formik.getFieldProps('description')}
        />
        {/* remarks */}
        <TextField
          variant='standard'
          multiline
          minRows={2}
          focused
          error={
            formik.touched.remarks && formik.errors.remarks ? true : false
          }
          id="remarks"
          label="remarks"
          fullWidth
          helperText={
            formik.touched.remarks && formik.errors.remarks ? formik.errors.remarks : ""
          }
          type="number"
          {...formik.getFieldProps('remarks')}
        />
      </Stack>
      <Button variant="contained" color="primary" type="submit"
        disabled={Boolean(isLoading)}
        fullWidth>{Boolean(isLoading) ? <CircularProgress /> : "Create"}
      </Button>
    </form>
  )
}

export default NewLeadForm
