import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import "./index.css"
import App from "./App.jsx"
import Admin from "./Pages/Admin.jsx"
import GetHelp from "./Pages/GetHelp.jsx"
import MyRequests from "./Pages/MyRequests.jsx"
import Support from "./Pages/Support.jsx"
import FeedBack from "./Pages/FeedBack.jsx"
import Ideas from "./Pages/Ideas.jsx"
import PreAdLogin from "./Pages/PreAdLogin.jsx"
import ResetPassword from "./Pages/ResetPassword.jsx"
import Updates from "./Pages/Updates.jsx"
import PrivacyPolicy from "./Pages/PrivacyPolicy";

function ProtectedAdminRoute({ children }) {
  const isAdminAuthenticated = sessionStorage.getItem("isAdminAuthenticated") === "true"
  return isAdminAuthenticated ? children : <Navigate to="/preadmin" replace />
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/preadmin" element={<PreAdLogin />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin-login" element={<Navigate to="/preadmin" replace />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedAdminRoute>
              <Admin />
            </ProtectedAdminRoute>
          } 
        />
        <Route path="/gethelp" element={<GetHelp />} />
        <Route path="/myrequests" element={<MyRequests />} />
        <Route path="/support" element={<Support />} />
        <Route path="/feedback" element={<FeedBack />} />
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)