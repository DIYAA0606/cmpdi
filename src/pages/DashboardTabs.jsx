import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Tabs from '../components/ui/Tabs'

const TABS = [
  { id: 'overview', label: 'Executive Overview', path: '/dashboard' },
  { id: 'forecast', label: 'Production Forecast', path: '/dashboard/forecast' },
]

export default function DashboardTabs() {
  const location = useLocation()
  const navigate = useNavigate()

  const isForecast = location.pathname.startsWith('/dashboard/forecast')
  const currentTab = isForecast ? 'Production Forecast' : 'Executive Overview'

  const handleTabChange = (label) => {
    const target = TABS.find((t) => t.label === label)
    if (target && target.path !== location.pathname) {
      navigate(target.path)
    }
  }

  return (
    <div className="tabbed-page-container">
      <div className="page-header">
        <div>
          <p className="eyebrow">Executive Operations</p>
          <h1>CMPDI / CIL Mining Operations</h1>
        </div>
      </div>
      <Tabs
        tabs={TABS.map((t) => t.label)}
        value={currentTab}
        onChange={handleTabChange}
      />
      <div className="tab-content">
        <Outlet />
      </div>
    </div>
  )
}
