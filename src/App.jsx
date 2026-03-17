import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import PassesPage from './pages/PassesPage'
import PassDetailPage from './pages/PassDetailPage'
import useSupabasePasses from './hooks/useSupabasePasses'

function App() {
  const { passes, loading, isLive, error } = useSupabasePasses()

  return (
    <>
      <Navbar isLive={isLive} />
      <Routes>
        <Route path="/" element={
          <HomePage passes={passes} loading={loading} isLive={isLive} error={error} />
        } />
        <Route path="/pases" element={
          <PassesPage passes={passes} loading={loading} />
        } />
        <Route path="/pase/:id" element={
          <PassDetailPage />
        } />
      </Routes>
      <Footer />
    </>
  )
}

export default App
