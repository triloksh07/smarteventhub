import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './shared/Navbar.jsx'
import Footer from './shared/Footer.jsx'
import Landing from './pages/Landing.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminSignup from './pages/AdminSignup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Events from './pages/Events.jsx'
import Participants from './pages/Participants.jsx'
import Register from './pages/Register.jsx'
import Designer from './pages/Designer.jsx'
import ProtectedRoute from './shared/ProtectedRoute.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/events" element={<Events />} />
          <Route path="/admin/events/:id/participants" element={<Participants />} />
          <Route path="/designer" element={<Designer />} />
        </Route>

        <Route path="/register/:shareId" element={<Register />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  )
}
