import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClientProvider, QueryClient } from "react-query";

import './index.css'
import { UserProvider } from "./contexts/userContext";
import { BrowserRouter } from "react-router-dom";
import { ChoiceProvider } from "./contexts/dialogContext";
import { MenuProvider } from "./contexts/menuContext";


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
      retry: false
    }
  }
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <UserProvider>
        <ChoiceProvider>
          <MenuProvider>
            <App />
          </MenuProvider>
        </ChoiceProvider>
      </UserProvider>
    </BrowserRouter>
  </QueryClientProvider>
)

