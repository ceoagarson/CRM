import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClientProvider, QueryClient } from "react-query";
import App from "./App";
import { UserProvider } from "./contexts/userContext";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retryDelay:5000
    }
  }
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </UserProvider>
  </QueryClientProvider>
);
