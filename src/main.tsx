import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime: 1000 * 60,// fresh for 60 sec
      gcTime:1000 * 60 * 5 //unused cache gonna be cleared after 5 min
    }
  }
});

/**
 basically you fetch page 1
  data is FREHS for 60 seconds
  during 60 sec, navigating away and back = instant, no refetch
  after 60 sec, data goes STALE
  next time you vissit page 1, cached data shows immediately + background refetch happens
 */ 

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
