import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BasketProvider } from "./context/BasketContext.tsx";
import { ResProvider } from "./context/ResCtx.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider>
        <ResProvider>
          <BasketProvider>
            <App />
          </BasketProvider>
        </ResProvider>
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>
);
