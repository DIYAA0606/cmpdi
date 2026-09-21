import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import InstitutionalHeader from '../components/InstitutionalHeader'
import InstitutionalFooter from '../components/InstitutionalFooter'
import OnboardingWalkthrough from '../components/ui/OnboardingWalkthrough'

export default function AppShell() {
  const [showOnboarding, setShowOnboarding] = useState(false)

  return (
    <div className="platform-app-shell">
      <InstitutionalHeader />
      <main className="platform-main-container">
        <Outlet />
      </main>
      <InstitutionalFooter />

      {showOnboarding && (
        <OnboardingWalkthrough isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
      )}
    </div>
  )
}
