import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import ProjectLayout from './components/ProjectLayout'
import BacklogPage from './pages/BacklogPage'
import CreateProjectPage from './pages/CreateProjectPage'
import DashboardPage from './pages/DashboardPage'
import FallbacksPage from './pages/FallbacksPage'
import ImportPage from './pages/ImportPage'
import LoginPage from './pages/LoginPage'
import ProjectsPage from './pages/ProjectsPage'
import RegisterPage from './pages/RegisterPage'
import RequestsPage from './pages/RequestsPage'
import ScenariosPage from './pages/ScenariosPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/projects" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/new" element={<CreateProjectPage />} />

      <Route path="/projects/:projectId" element={<ProjectLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="requests" element={<RequestsPage />} />
        <Route path="fallbacks" element={<FallbacksPage />} />
        <Route path="scenarios" element={<ScenariosPage />} />
        <Route path="import" element={<ImportPage />} />
        <Route path="backlog" element={<BacklogPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/projects" replace />} />
    </Routes>
  )
}

export default App
