import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'
import Breadcrumbs from '../components/Breadcrumbs'

export default function AppShell() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false)

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const handleMenuToggle = () => {
    if (window.innerWidth <= 768) {
      setIsMobileMenuOpen((state) => !state)
      return
    }

    setIsDesktopCollapsed((state) => !state)
  }

  return (
    <div className={`app-shell ${isDesktopCollapsed ? 'is-desktop-collapsed' : ''}`}>
      <div
        className={`mobile-backdrop ${isMobileMenuOpen ? 'is-visible' : ''}`}
        aria-hidden={!isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <Sidebar
        isDrawerOpen={isMobileMenuOpen}
        isCollapsed={isDesktopCollapsed}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <div className="app-main">
        <TopBar onMenuToggle={handleMenuToggle} />
        <Breadcrumbs key={location.pathname} />
        <main className="page-shell">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
