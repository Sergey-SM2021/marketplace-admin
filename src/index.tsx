import { App } from "./App/App"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

reportWebVitals()
