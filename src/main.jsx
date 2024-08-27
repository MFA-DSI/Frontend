import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>,
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
);
