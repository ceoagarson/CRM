import { LinearProgress } from '@mui/material'
import React, { Suspense, useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { UserContext } from './contexts/userContext'
import LoginPage from './pages/users/LoginPage'
import DashBoardNavBar from './components/navbar/DashBoardNavBar'
import CrmNavBar from './components/navbar/CrmNavBar'
import BotNavBar from './components/navbar/BotNavBar'
import SchedulerNavBar from './components/navbar/SchedulerNavBar'
import BroadcastNavBar from './components/navbar/BroadcastNavBar'
import UsersNavBar from './components/navbar/UsersNavBar'
import EmailVerifyPage from './pages/users/EmailVerifyPage'
import UsersPage from './pages/users/UsersPage'
import DashBoardPage from './pages/DashBoardPage'
import LeadsPage from './pages/crm/LeadsPage'
import FlowsPage from './pages/bot/FlowsPage'
import BackupPage from './pages/backup/BackupPage'

// lazy loding
const ResetPasswordDialog = React.lazy(() => import('./components/dialogs/users/ResetPasswordDialog'))
const CustomersPage = React.lazy(() => import('./pages/crm/CustomersPage'))
const UpdateLeadFieldsPage = React.lazy(() => import('./pages/crm/UpdateLeadFieldsPage'))
const TrackersPage = React.lazy(() => import('./pages/bot/TrackersPage'))

export enum paths {
  //navbars
  login = "/",
  dashboard = "/",
  crm = "/crm",
  bot = "/bot",
  broadcast = "/broadcast",
  scheduler = "/scheduler",
  users = "users",

  //leads
  leads = "leads",
  customers = "customers",
  updateble_fields_lead = "updateble_fields_lead",

  //bot

  flows = "flows",
  trackers = "trackers",

  //users
  reset_password = "/password/reset/:token",
  verify_email = "/email/verify/:token",

  //backup
  backup_page = "backup_page"
}

function AppRoutes() {
  const { user } = useContext(UserContext)

  return (
    <Routes >
      {
        !user && <Route path={paths.login} element={<LoginPage />} />}
      {
        user && <Route>
          < Route element={<DashBoardNavBar />
          }>
            <Route
              path={paths.dashboard}
              element={
                <DashBoardPage />
              }
            />
          </Route>
          {/* crm nav bar */}
          < Route path={paths.crm} element={<CrmNavBar />
          }>
            <Route index element={
              <LeadsPage />
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
                <FlowsPage />
              }
            />
            <Route path={paths.flows} element={
              < FlowsPage />
            }
            />
            <Route path={paths.trackers} element={
              <Suspense fallback={<LinearProgress />}>
                < TrackersPage />
              </Suspense>
            }
            />
          </Route>

          {/* scheduler nav bar */}
          < Route path={paths.scheduler} element={<SchedulerNavBar />
          }>
            <Route
              index element={
                <DashBoardPage />
              }
            />
          </Route>
          {/* broadcast nav bar */}
          < Route path={paths.broadcast} element={<BroadcastNavBar />
          }>
            <Route
              index element={
                <DashBoardPage />
              }
            />
          </Route>
          {/* users nav bar */}
          {user._id === user.created_by._id &&
            < Route path={paths.users} element={<UsersNavBar />}>
              <Route index
                element={
                  <UsersPage />
                }
              />
              <Route
                path={paths.users} element={
                  <UsersPage />
                }
              />
            </Route>}
          {/* backup */}
          {user._id === user.created_by._id &&
            <Route path={paths.backup_page} element={<DashBoardNavBar />}>
              <Route index
                element={
                  <BackupPage />
                }
              />
              <Route
                path={paths.backup_page} element={
                  <BackupPage />
                }
              />
            </Route>}
        </Route>
      }

      <Route path={paths.reset_password} element={<ResetPasswordDialog />} />
      <Route path={paths.verify_email} element={<EmailVerifyPage />} />
      <Route path="*" element={<Navigate to={paths.login} />} />
    </Routes >

  )
}

export default AppRoutes




