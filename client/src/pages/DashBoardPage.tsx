import { Box, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { GetAccounts } from "../services/AccountServices"
import { GetActivities } from "../services/ActivityServices"
import { GetLeads } from "../services/LeadsServices"
import { GetOpportunities } from "../services/OpportunityServices"
import { GetUsers } from "../services/UserServices"
import { BackendError } from "../types"
import { IAccount } from "../types/account.type"
import { IActivity } from "../types/activity.type"
import { ILead } from "../types/lead.type"
import { IOpportunity } from "../types/opportunity.type"
import { IUser } from "../types/user.type"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';



ChartJS.register(ArcElement, Tooltip, Legend);


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
  const [userStatus, setUserStatus] = useState<{
    active: number,
    blocked: number,
    admins: number,
    owners: number
  }>()

  const { data: accounts, isSuccess: isAccountsSuccess} = useQuery
    <AxiosResponse<IAccount[]>, BackendError>("accounts", GetAccounts)

  const { data: opportunities, isSuccess: isOpportunitiesSuccess } = useQuery
    <AxiosResponse<IOpportunity[]>, BackendError>("opportunities", GetOpportunities)
  const { data: activities, isSuccess: isActivitySuccess } = useQuery
    <AxiosResponse<IActivity[]>, BackendError>("activities", GetActivities)

  const { data: leads, isSuccess: isLeadsSuccess} = useQuery
    <AxiosResponse<ILead[]>, BackendError>("leads", GetLeads)

  const { data: users, isSuccess: isUsersSuccess } = useQuery<AxiosResponse<IUser[]>, BackendError>("users", GetUsers)

  // handle users
  useEffect(() => {
    if (isUsersSuccess) {
      let active = 0;
      let blocked = 0;
      let admins = 0;
      let owners = 0;
      users?.data?.map(user => {
        if (user.is_active)
          active++
        if (user.roles.includes("admin"))
          admins++
        if (user.roles.includes("owner"))
          owners++
        if (!user.is_active)
          blocked++
        return null
      })
      setUserStatus({
        active: active,
        blocked: blocked,
        admins: admins,
        owners: owners,
      })
    }
  }, [users, isUsersSuccess])

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

  const UsersChartData = {
    labels: ['active', 'blocked', 'admin', 'owners'],
    datasets: [
      {
        label: '',
        data: [userStatus?.active, userStatus?.blocked, userStatus?.admins, userStatus?.owners],
        backgroundColor: [
          'lightgreen',
          'red',
          'lightblue',
          'lightpink',
        ],
        borderColor: [
          'black',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };
  const LeadsChartData = {
    labels: ['active', 'closed'],
    datasets: [
      {
        label: '',
        data: [leadsStatus?.open, leadsStatus?.closed],
        backgroundColor: [
          'lightblue',
          'red'
        ],
        borderColor: [
          'black',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const AccountsChartData = {
    labels: ['active', 'closed'],
    datasets: [
      {
        label: '',
        data: [accountsStatus?.open, accountsStatus?.closed],
        backgroundColor: [
          'lightblue',
          'red'
        ],
        borderColor: [
          'black',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const OpportunitiesChartData = {
    labels: ['active', 'closed'],
    datasets: [
      {
        label: '',
        data: [opportunitiesStatus?.open, opportunitiesStatus?.closed],
        backgroundColor: [
          'lightblue',
          'red'
        ],
        borderColor: [
          'black',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const ActivitiesChartData = {
    labels: ['active', 'closed'],
    datasets: [
      {
        label: '',
        data: [activitiesStatus?.open, activitiesStatus?.closed],
        backgroundColor: [
          'lightblue',
          'red'
        ],
        borderColor: [
          'black',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Box sx={{ padding: 2 }}>
        {/* leads ,accounts and opportunties */}
        <Stack
          justifyContent="space-between"
          sx={{ paddingTop: 4 }}
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Stack direction="column"
            justifyContent="center" alignItems="center">
            <Pie data={LeadsChartData} />
            <Typography variant="button">Leads</Typography>

          </Stack>
          <Stack direction="column"
            justifyContent="center" alignItems="center">
            <Pie data={OpportunitiesChartData} />
            <Typography variant="button">Opportunities</Typography>
          </Stack>
          {/* accounts */}
          <Stack direction="column"
            justifyContent="center" alignItems="center">
            <Pie data={AccountsChartData} />
            <Typography variant="button">Accounts</Typography>
          </Stack>
        </Stack>
        {/* users and activities */}
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ paddingTop: 4 }}
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Stack direction="column"
            justifyContent="center" alignItems="center">
            <Pie data={UsersChartData} />
            <Typography variant="button">Users</Typography>
          </Stack>
          <Stack direction="column"
            justifyContent="center" alignItems="center">
            <Pie data={ActivitiesChartData} />
            <Typography variant="button">Activities</Typography>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}


export default DashBoardPage