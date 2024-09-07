import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"
import "./styles/normalize.css"
import "./styles/main.css"
import "./styles/budget.css"
import "./styles/maintainModal.css"
import "./styles/categoryLineItem.css"
import "./styles/linesForm.css"
import "./styles/dropdownInput.css"
import "./styles/header.css"
import "./styles/investments.css"
import "./styles/sidePanel.css"
import "./styles/input.css"
import "./styles/profile.css"

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
