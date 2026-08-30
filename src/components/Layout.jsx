import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ChatWidget from './ChatWidget'
import LocationModal from './LocationModal'
import CinematicFarmBackground from './CinematicFarmBackground'

export default function Layout() {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col" style={{ background: '#F5F1E8', color: '#10251B' }}>
      {/* ── Reusable Cinematic Video + Atmosphere Background ── */}
      <CinematicFarmBackground isLanding={isLanding} />

      <Header />
      <LocationModal />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative z-10 flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
