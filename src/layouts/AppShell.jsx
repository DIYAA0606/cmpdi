import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'
import Breadcrumbs from '../components/Breadcrumbs'
import OnboardingWalkthrough from '../components/ui/OnboardingWalkthrough'

export default function AppShell() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(true)

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

  if (location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/documents')) {
    return (
      <div className="dashboard-shell">
        <Outlet />
      </div>
    )
  }

  if (location.pathname.startsWith('/mining-map')) {
    return <Outlet />
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

      {/* First-Login / Initial Session Onboarding Walkthrough */}
      <OnboardingWalkthrough isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
    </div>
  )
}
