import { LinearProgress } from '@mui/material'
import React, { Suspense, useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ResetPasswordDialog from './components/dialogs/users/ResetPasswordDialog'
import { UserContext } from './contexts/userContext'
import EmailVerifyPage from './pages/EmailVerifyPage'
import LoginPage from './pages/LoginPage'
import CustomersPage from './pages/CustomersPage'
import UpdateLeadFieldsPage from './pages/UpdateLeadFieldsPage'
import CrmNavBar from './components/navbar/CrmNavBar'
import BotNavBar from './components/navbar/BotNavBar'
import SchedulerNavBar from './components/navbar/SchedulerNavBar'
import DashBoardNavBar from './components/navbar/DashBoardNavBar'
import BroadcastNavBar from './components/navbar/BroadcastNavBar'
import UsersNavBar from './components/navbar/UsersNavBar'
import DashBoardPage from './pages/DashBoardPage'
const LeadsPage = React.lazy(() => import('./pages/LeadsPage'))
const UsersPage = React.lazy(() => import('./pages/UsersPage'))

export enum paths {
  //navbars
  login = "/",
  dashboard = "/",
  crm = "/crm",
  bot = "/bot",
  broadcast = "/broadcast",
  scheduler = "/scheduler",
  users = "users",

  //sub items
  leads = "leads",
  customers = "customers",
  machines = "machines",
  categories = "categories",
  updateble_fields_lead = "updateble_fields_lead",
  reports = "reports",
  productions = "productions",
  reset_password = "/password/reset/:token",
  verify_email = "/email/verify/:token"
}

function AppRoutes() {
  const { user } = useContext(UserContext)
  return (
    <Routes >
      {
        !user ?
          <Route path={paths.login} element={<LoginPage />} />
          :
          <Route>
            < Route element={<DashBoardNavBar />
            }>
              <Route
                path={paths.dashboard}
                element={
                  <Suspense fallback={<LinearProgress />}>
                    <DashBoardPage />
                  </Suspense>
                }
              />
            </Route>
            {/* crm nav bar */}
            < Route path={paths.crm} element={<CrmNavBar />
            }>
              <Route index element={
                <Suspense fallback={<LinearProgress />}><LeadsPage /></Suspense>
              }
              />
              <Route path={paths.leads} index element={
                <Suspense fallback={<LinearProgress />}><LeadsPage /></Suspense>
              }
              />
              <Route
                path={paths.customers} element={
                  <Suspense fallback={<LinearProgress />}><CustomersPage /></Suspense>

                }
              />
              <Route
                path={paths.updateble_fields_lead} element={
                  <Suspense fallback={<LinearProgress />}><UpdateLeadFieldsPage />
                  </Suspense>
                }
              />
            </Route>
            {/* bot nav bar */}
            < Route path={paths.bot} element={<BotNavBar />
            }>
              <Route
                index element={
                  <Suspense fallback={<LinearProgress />}>
                    <DashBoardPage />
                  </Suspense>
                }
              />
            </Route>
            {/* scheduler nav bar */}
            < Route path={paths.scheduler} element={<SchedulerNavBar />
            }>
              <Route
                index element={
                  <Suspense fallback={<LinearProgress />}>
                    <DashBoardPage />
                  </Suspense>
                }
              />
            </Route>
            {/* broadcast nav bar */}
            < Route path={paths.broadcast} element={<BroadcastNavBar />
            }>
              <Route
                index element={
                  <Suspense fallback={<LinearProgress />}>
                    <DashBoardPage />
                  </Suspense>
                }
              />
            </Route>
            {/* users nav bar */}
            < Route path={paths.users} element={<UsersNavBar />}>
              <Route index
                element={
                  <Suspense fallback={<LinearProgress />}><UsersPage />
                  </Suspense>

                }
              />
              <Route
                path={paths.users} element={
                  <Suspense fallback={<LinearProgress />}><UsersPage />
                  </Suspense>

                }
              />
            </Route>
          </Route>
      }
      <Route path={paths.reset_password} element={<ResetPasswordDialog />} />
      <Route path={paths.verify_email} element={<EmailVerifyPage />} />
      <Route path="*" element={<Navigate to={paths.login} />} />
    </Routes >
  )
}

export default AppRoutes




