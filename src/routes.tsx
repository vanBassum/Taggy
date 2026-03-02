import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import App from "./App"
import EditPage from "./pages/EditPage"
import LandingPage from "./pages/LandingPage"

function RootRoute() {
  const { search } = useLocation()
  return search ? <App /> : <LandingPage />
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRoute />} />
      <Route path="/edit" element={<EditPage />} />
      <Route path="/v/:tag" element={<App />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}