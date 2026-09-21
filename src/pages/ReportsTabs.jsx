import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Tabs from '../components/ui/Tabs'

const TABS = [
  { id: 'parliamentary', label: 'Parliamentary Workflow', path: '/reports/parliamentary' },
  { id: 'builder', label: 'Report Builder', path: '/reports' },
]

export default function ReportsTabs() {
  const location = useLocation()
  const navigate = useNavigate()

  const isParliamentary = location.pathname.startsWith('/reports/parliamentary')
  const currentTab = isParliamentary ? 'Parliamentary Workflow' : 'Report Builder'

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
          <p className="eyebrow">Reporting & Inquiries</p>
          <h1>Reports & Parliamentary Responses</h1>
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
