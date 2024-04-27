import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"
import "./styles/normalize.css"
import "./styles/main.css"
import "./styles/budget.css"
import "./styles/modal.css"
import "./styles/category.css"
import "./styles/addEditPopout.css"
import "./styles/select.css"
import "./styles/header.css"
import "./styles/summary.css"
import "./styles/investments.css"

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
)
