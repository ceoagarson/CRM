import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClientProvider, QueryClient } from "react-query";

import './index.css'
import { UserProvider } from "./contexts/userContext";
import { BrowserRouter } from "react-router-dom";
import { ChoiceProvider } from "./contexts/dialogContext";
import { MenuProvider } from "./contexts/menuContext";
import { LoadingProvider } from './contexts/loaderContext.tsx';


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
      retry: false,
      refetchOnMount: true,
      staleTime:100
    }
  }
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <UserProvider>
        <LoadingProvider>
          <ChoiceProvider>
            <MenuProvider>
              <App />
            </MenuProvider>
          </ChoiceProvider>
        </LoadingProvider>
      </UserProvider>
    </BrowserRouter>
  </QueryClientProvider>
)

