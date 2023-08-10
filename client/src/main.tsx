import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClientProvider, QueryClient } from "react-query";

import './index.css'
import { UserProvider } from "./contexts/userContext";
import { BrowserRouter } from "react-router-dom";
import { ChoiceProvider } from "./contexts/dialogContext";
import { MenuProvider } from "./contexts/menuContext";
import { SelectionProvider } from "./contexts/selectionContext";
import { PaginationProvider } from './contexts/paginationContext.tsx';


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
      retry:false
    }
  }
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <UserProvider>
        <PaginationProvider>
          <ChoiceProvider>
            <MenuProvider>
              <SelectionProvider>
                <App />
              </SelectionProvider>
            </MenuProvider>
          </ChoiceProvider>
        </PaginationProvider>
      </UserProvider>
    </BrowserRouter>
  </QueryClientProvider>
)

