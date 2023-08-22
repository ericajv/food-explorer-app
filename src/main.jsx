import React from "react"
import ReactDOM from "react-dom/client"

import { ThemeProvider } from "styled-components"
import theme from "./styles/theme"
import GlobalStyles from "./styles/global"

import { AuthProvider } from "./hooks/authContext.jsx"
import { Routes } from "./Routes"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)
