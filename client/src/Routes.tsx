import { LinearProgress } from '@mui/material'
import React, { Suspense, useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ResetPasswordDialog from './components/dialogs/users/ResetPasswordDialog'
import { UserContext } from './contexts/userContext'
import DashboardLayout from './layouts/DashboardLayout'
import EmailVerifyPage from './pages/EmailVerifyPage'
import LoginPage from './pages/LoginPage'
const AccountsPage = React.lazy(() => import('./pages/AccountsPage'))
const ActivitiesPage = React.lazy(() => import('./pages/ActivitiesPage'))
const DashBoardPage = React.lazy(() => import('./pages/DashBoardPage'))
const LeadsPage = React.lazy(() => import('./pages/LeadsPage'))
const OpportunityPage = React.lazy(() => import('./pages/OpportunityPage'))
const UsersPage = React.lazy(() => import('./pages/UsersPage'))

export enum paths {
  login = "/",
  dashboard = "/dashboard",
  leads = "leads",
  accounts = "accounts",
  activities = "activities",
  opportunities = "opportunities",
  users = "users",
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
          < Route path={paths.dashboard} element={<DashboardLayout />
          }>
            <Route
              index element={
                <Suspense fallback={<LinearProgress />}>
                  <DashBoardPage />
                </Suspense>

              }
            />
            <Route
              path={paths.users} element={
                <Suspense fallback={<LinearProgress />}><UsersPage />
                </Suspense>

              }
            />
            <Route
              path={paths.leads} element={
                <Suspense fallback={<LinearProgress />}><LeadsPage /></Suspense>

              }
            />
            <Route
              path={paths.activities} element={
                <Suspense fallback={<LinearProgress />}><ActivitiesPage /></Suspense>
              }
            />
            <Route
              path={paths.opportunities} element={
                <Suspense fallback={<LinearProgress />}><OpportunityPage /></Suspense>
              }
            />
            <Route
              path={paths.accounts} element={
                <Suspense fallback={<LinearProgress />}><AccountsPage /></Suspense>
              }
            />
          </Route>

      }
      <Route path={paths.reset_password} element={<ResetPasswordDialog />} />
      <Route path={paths.verify_email} element={<EmailVerifyPage />} />
      <Route path="*" element={<Navigate to={paths.login} />} />
    </Routes >
  )
}

export default AppRoutes




