import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { UserActions, UserContext } from './contexts/userContext';
import AppRoutes, { paths } from "./Routes";
import { GetProfile } from './services/UserServices';

function App() {
  const goto = useNavigate()
  const { data, isSuccess, isError } = useQuery("profile", GetProfile, {
    retry: false,
    refetchOnWindowFocus: true
  })
  const { dispatch } = useContext(UserContext)

  useEffect(() => {
    if (isSuccess)
      dispatch({ type: UserActions.login, payload: data.data })
    if (isError) {
      goto(paths.home)
    }
  }, [isSuccess, isError, dispatch])

  return (
    <AppRoutes />
  )
}

export default App