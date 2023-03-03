import { Box, Paper, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { GetAccounts } from "../services/AccountServices"
import { GetActivities } from "../services/ActivityServices"
import { GetLeads } from "../services/LeadsServices"
import { GetOpportunities } from "../services/OpportunityServices"
import { BackendError } from "../types"
import { IAccount } from "../types/account.type"
import { IActivity } from "../types/activity.type"
import { ILead } from "../types/lead.type"
import { IOpportunity } from "../types/opportunity.type"


function DashBoardPage() {
  const [leadsStatus, setLeadsStatus] = useState<{
    open: number,
    closed: number
  }>()
  const [accountsStatus, setAccountsStatus] = useState<{
    open: number,
    closed: number
  }>()
  const [activitiesStatus, setActivitiesStatus] = useState<{
    open: number,
    closed: number
  }>()
  const [opportunitiesStatus, setOpportunitiesStatus] = useState<{
    open: number,
    closed: number
  }>()

  const { data: accounts, isSuccess: isAccountsSuccess } = useQuery
    <AxiosResponse<IAccount[]>, BackendError>("accounts", GetAccounts)

  const { data: opportunities, isSuccess: isOpportunitiesSuccess } = useQuery
    <AxiosResponse<IOpportunity[]>, BackendError>("opportunities", GetOpportunities)
  const { data: activities, isSuccess: isActivitySuccess } = useQuery
    <AxiosResponse<IActivity[]>, BackendError>("activities", GetActivities)

  const { data: leads, isSuccess: isLeadsSuccess } = useQuery
    <AxiosResponse<ILead[]>, BackendError>("leads", GetLeads)


  // handle leads
  useEffect(() => {
    if (isLeadsSuccess) {
      let open = 0;
      let closed = 0;
      leads?.data?.map(lead => {
        if (lead.status)
          open++
        else
          closed++
        return null
      })
      setLeadsStatus({
        open: open,
        closed: closed
      })
    }
  }, [leads, isLeadsSuccess])

  // handle accounts
  useEffect(() => {
    if (isAccountsSuccess) {
      let open = 0;
      let closed = 0;
      accounts?.data?.map(account => {
        if (account.status)
          open++
        else
          closed++
        return null
      })
      setAccountsStatus({
        open: open,
        closed: closed
      })
    }
  }, [accounts, isAccountsSuccess])
  // handle opportunities
  useEffect(() => {
    if (isOpportunitiesSuccess) {
      let open = 0;
      let closed = 0;
      opportunities?.data?.map(opportunity => {
        if (opportunity.status)
          open++
        else
          closed++
        return null
      })
      setOpportunitiesStatus({
        open: open,
        closed: closed
      })
    }
  }, [opportunities, isOpportunitiesSuccess])

  // handle activities
  useEffect(() => {
    if (isActivitySuccess) {
      let open = 0;
      let closed = 0;
      activities?.data?.map(activity => {
        if (activity.status)
          open++
        else
          closed++
        return null
      })
      setActivitiesStatus({
        open: open,
        closed: closed
      })
    }
  }, [activities, isActivitySuccess])

  return (
    <>
      <Box>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-around"
          spacing={2}
          padding={2}
        >
          {/* activities */}
          <Paper sx={{padding:2}}>
            <Stack
              spacing={2}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h6">{activities?.data.length} Activities</Typography>
              <Stack direction="row" spacing={2}>
                <Typography variant="body1" sx={{ color: "green" }}>{activitiesStatus?.open} Open </Typography>
                <Typography variant="body1" sx={{ color: "red" }}>{activitiesStatus?.closed} Closed</Typography>
              </Stack>
            </Stack>
          </Paper>
          {/* leads */}
          <Paper sx={{padding:2}}>
            <Stack
              spacing={2}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h6">{leads?.data.length} Leads</Typography>
              <Stack direction="row" spacing={2}>
                <Typography variant="body1" sx={{ color: "green" }}>{leadsStatus?.open} Open </Typography>
                <Typography variant="body1" sx={{ color: "red" }}>{leadsStatus?.closed} Closed</Typography>
              </Stack>
            </Stack>
          </Paper>
          {/* accounts */}
          <Paper sx={{padding:2}}>
            <Stack
              spacing={2}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h6">{accounts?.data.length} Accounts</Typography>
              <Stack direction="row" spacing={2}>
                <Typography variant="body1" sx={{ color: "green" }}>{accountsStatus?.open} Open </Typography>
                <Typography variant="body1" sx={{ color: "red" }}>{accountsStatus?.closed} Closed</Typography>
              </Stack>
            </Stack>
          </Paper>
          {/* opportunities */}
          <Paper sx={{padding:2}}>
            <Stack
              spacing={2}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h6">{opportunities?.data.length} Opportunities</Typography>
              <Stack direction="row" spacing={2}>
                <Typography variant="body1" sx={{ color: "green" }}>{opportunitiesStatus?.open} Open </Typography>
                <Typography variant="body1" sx={{ color: "red" }}>{opportunitiesStatus?.closed} Closed</Typography>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </>
  )
}


export default DashBoardPage