import React, { Suspense, useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { UserContext } from './contexts/userContext'
import { DashboardLayout } from './layouts'
const AccountsPage = React.lazy(() => import('./pages/AccountsPage'))
const ActivityPage = React.lazy(() => import('./pages/ActivityPage'))
const DashBoardPage = React.lazy(() => import('./pages/DashBoardPage'))
const HomePage = React.lazy(() => import('./pages/HomePage'))
const LeadsPage = React.lazy(() => import('./pages/LeadsPage'))
const OpportunityPage = React.lazy(() => import('./pages/OpportunityPage'))
const UsersPage = React.lazy(() => import('./pages/UsersPage'))
const HomeLayout = React.lazy(() => import('./layouts/HomeLayout'))

export enum paths {
  home = "/",
  about = "about",
  // dashboard routes
  dashboard = "/dashboard",
  leads = "leads",
  accounts = "accounts",
  activities = "activities",
  opportunities = "opportunities",
  users = "users"
}
function AppRoutes() {
  const { user } = useContext(UserContext)
  return (
    <Routes >
      {/* home layout */}
      {
        !user ?
          (
            <Route path={paths.home} element={<HomeLayout />}>
              <Route index element={<HomePage />} />
              <Route path={paths.about} element={<h1>about page</h1>} />
            </Route>
          )
          :
          (< Route path={paths.dashboard} element={
            <DashboardLayout />
          }>
            <Route
              index element={
                <Suspense fallback={"loading..."}>
                  <DashBoardPage />
                </Suspense>

              }
            />
            <Route
              path={paths.users} element={
                <Suspense fallback={"loading..."}><UsersPage />
                </Suspense>

              }
            />
            <Route
              path={paths.leads} element={
                <Suspense fallback={"loading..."}><LeadsPage /></Suspense>

              }
            />
            <Route
              path={paths.activities} element={
                <Suspense fallback={"loading..."}><ActivityPage /></Suspense>
              }
            />
            <Route
              path={paths.opportunities} element={
                <Suspense fallback={"loading..."}><OpportunityPage /></Suspense>
              }
            />
            <Route
              path={paths.accounts} element={
                <Suspense fallback={"loading..."}><AccountsPage /></Suspense>

              }
            />
          </Route>
          )
      }
      {/* not found */}
      <Route path="*" element={<Navigate to={paths.home} />} />
    </Routes >
  )
}

export default AppRoutes




