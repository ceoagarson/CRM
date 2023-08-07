import { LinearProgress } from '@mui/material'
import React, { Suspense, useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ResetPasswordDialog from './components/dialogs/users/ResetPasswordDialog'
import { UserContext } from './contexts/userContext'
import EmailVerifyPage from './pages/EmailVerifyPage'
import LoginPage from './pages/LoginPage'
import DashBoardPage from './pages/DashBoardPage'
import NavBar from './components/navbar/NavBar'
import CustomersPage from './pages/CustomersPage'
const LeadsPage = React.lazy(() => import('./pages/LeadsPage'))
const UsersPage = React.lazy(() => import('./pages/UsersPage'))

export enum paths {
  login = "/",
  dashboard = "/",
  leads = "leads",
  customers = "customers",
  machines = "machines",
  categories = "categories",
  reports = "reports",
  users = "users",
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
          < Route path={paths.dashboard} element={<NavBar />
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
              path={paths.customers} element={
                <Suspense fallback={<LinearProgress />}><CustomersPage /></Suspense>

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




