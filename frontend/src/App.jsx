import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import IncidentDetail from './pages/IncidentDetail'
import Practice from './pages/Practice'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/incident/:id" element={<IncidentDetail />} />
        <Route path="/practice" element={<Practice />} />
      </Routes>
    </div>
  )
}

export default App
