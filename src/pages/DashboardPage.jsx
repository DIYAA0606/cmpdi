import Card from '../components/ui/Card'
import StatCard from '../components/ui/StatCard'
import DataTable from '../components/ui/DataTable'
import PipelineStrip from '../components/dashboard/PipelineStrip'
import TrendChart from '../components/dashboard/TrendChart'
import ActivityFeed from '../components/dashboard/ActivityFeed'
import { activityFeed, dashboardSummary } from '../data/dashboardMock'

const tableColumns = [
  { key: 'name', label: 'Subsidiary' },
  { key: 'documents', label: 'Documents' },
  { key: 'automation', label: 'Automation' },
  { key: 'conflicts', label: 'Conflicts' },
  { key: 'verification', label: 'Pending Verification' },
  { key: 'status', label: 'Status' },
]

const formatNumber = (value) => new Intl.NumberFormat('en-IN').format(value)

export default function DashboardPage({ hideHeader = false }) {
  const summary = dashboardSummary

  return (
    <div className="dashboard-page">
      {!hideHeader && (
        <div className="page-header">
          <div>
            <p className="eyebrow">Overview</p>
            <h1>CMPDI / CIL Mining Intelligence</h1>
          </div>
        </div>
      )}

      <div className="dashboard-kpis">
        <StatCard
          label="Documents processed"
          value={formatNumber(summary.documentsProcessed)}
          change="+18.2% vs last month"
          tone="success"
          trend="up"
          icon="documents"
        />
        <StatCard
          label="Automation rate"
          value={`${summary.automationRate}%`}
          change="+4.8 pts"
          tone="purple"
          trend="up"
          icon="gauge"
        />
        <StatCard
          label="Conflicts detected"
          value={summary.conflictsDetected}
          change="12 critical"
          tone="danger"
          trend="up"
          icon="alert"
        />
        <StatCard
          label="Pending verifications"
          value={summary.pendingVerifications}
          change="29 require escalation"
          tone="warning"
          trend="down"
          icon="check"
        />
        <StatCard
          label="Avg. processing time"
          value={`${summary.avgProcessingTimeHours} hrs`}
          change="-1.2 hrs"
          tone="cyan"
          trend="down"
          icon="clock"
        />
      </div>

      <Card className="dashboard-section">
        <div className="section-header">
          <h2>Intelligence flow</h2>
        </div>
        <PipelineStrip />
      </Card>

      <div className="dashboard-grid">
        <Card className="dashboard-section dashboard-section--wide">
          <div className="section-header">
            <h2>Documents processed over time</h2>
          </div>
          <TrendChart data={summary.trend} />
        </Card>

        <Card className="dashboard-section">
          <div className="section-header">
            <h2>Recent activity</h2>
          </div>
          <ActivityFeed items={activityFeed} />
        </Card>
      </div>

      <Card className="dashboard-section">
        <div className="section-header">
          <h2>Subsidiary performance</h2>
        </div>
        <DataTable
          columns={tableColumns}
          rows={summary.subsidiaries.map((item) => ({
            ...item,
            documents: formatNumber(item.documents),
            automation: `${item.automation}%`,
            conflicts: item.conflicts,
            verification: item.verification,
          }))}
        />
      </Card>
    </div>
  )
}
