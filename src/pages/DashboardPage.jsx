import React from 'react'
import Card from '../components/ui/Card'
import StatCard from '../components/ui/StatCard'
import DataTable from '../components/ui/DataTable'
import Badge from '../components/ui/Badge'
import PipelineStrip from '../components/dashboard/PipelineStrip'
import TrendChart from '../components/dashboard/TrendChart'
import ActivityFeed from '../components/dashboard/ActivityFeed'
import { activityFeed, dashboardSummary } from '../data/dashboardMock'
import { useAuth } from '../context/AuthContext'

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
  const { user, role } = useAuth()
  const activeRole = role || 'Analyst'

  // Define role-based banner text and emphasis theme
  const roleInfo = {
    Analyst: {
      title: 'Analyst Workspace View',
      desc: 'Surfacing document processing volume, OCR ingestion status, and AI research query metrics.',
      badgeTone: 'info',
    },
    Reviewer: {
      title: 'Reviewer Workspace View',
      desc: 'Surfacing open conflict flags, pending verification queue, and multi-subsidiary data quality status.',
      badgeTone: 'caution',
    },
    Admin: {
      title: 'Admin Workspace View',
      desc: 'Surfacing system-wide activity, audit log operations, and subsidiary governance performance.',
      badgeTone: 'critical',
    },
  }[activeRole] || {
    title: 'Executive Operations Briefing',
    desc: 'Unified decision support across all Coal India operating subsidiaries.',
    badgeTone: 'neutral',
  }

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

      {/* Role Emphasis Banner */}
      <Card style={{ padding: '14px 20px', marginBottom: '20px', background: 'var(--surface-strong)', borderLeft: '4px solid var(--steel-700)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--navy-900)' }}>{roleInfo.title}</span>
              <Badge tone={roleInfo.badgeTone}>{activeRole} View</Badge>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {roleInfo.desc} Logged in as <strong>{user?.name || 'Rahul Sharma'}</strong> ({user?.subsidiary || 'CCL'}).
            </div>
          </div>
        </div>
      </Card>

      {/* KPI Stat Cards — Emphasize based on role */}
      <div className="dashboard-kpis">
        <StatCard
          label="Documents processed"
          value={formatNumber(summary.documentsProcessed)}
          change="+18.2% vs last month"
          tone={activeRole === 'Analyst' ? 'purple' : 'success'}
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
          tone={activeRole === 'Reviewer' ? 'danger' : 'warning'}
          trend="up"
          icon="alert"
        />
        <StatCard
          label="Pending verifications"
          value={summary.pendingVerifications}
          change="29 require escalation"
          tone={activeRole === 'Reviewer' ? 'danger' : 'caution'}
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

      {/* Role-based widget order rendering */}
      {activeRole === 'Reviewer' ? (
        <>
          {/* Reviewer layout: Subsidiary Conflicts & Verification Queue surfaced first */}
          <Card className="dashboard-section" style={{ borderLeft: '3px solid var(--amber-500)' }}>
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>Subsidiary Conflict & Verification Queue (Reviewer Focus)</h2>
              <Badge tone="caution">Priority Queue</Badge>
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

          <div className="dashboard-grid">
            <Card className="dashboard-section dashboard-section--wide">
              <div className="section-header">
                <h2>Documents processed over time</h2>
              </div>
              <TrendChart data={summary.trend} />
            </Card>

            <Card className="dashboard-section">
              <div className="section-header">
                <h2>Recent activity & audit events</h2>
              </div>
              <ActivityFeed items={activityFeed} />
            </Card>
          </div>

          <Card className="dashboard-section">
            <div className="section-header">
              <h2>Intelligence flow</h2>
            </div>
            <PipelineStrip />
          </Card>
        </>
      ) : activeRole === 'Admin' ? (
        <>
          {/* Admin layout: Recent Activity Feed & System Pipeline surfaced first */}
          <div className="dashboard-grid">
            <Card className="dashboard-section dashboard-section--wide">
              <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>System Activity & Operational Feed (Admin Focus)</h2>
                <Badge tone="critical">System Audit</Badge>
              </div>
              <ActivityFeed items={activityFeed} />
            </Card>

            <Card className="dashboard-section">
              <div className="section-header">
                <h2>Documents processed over time</h2>
              </div>
              <TrendChart data={summary.trend} />
            </Card>
          </div>

          <Card className="dashboard-section">
            <div className="section-header">
              <h2>Intelligence flow</h2>
            </div>
            <PipelineStrip />
          </Card>

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
        </>
      ) : (
        <>
          {/* Analyst default layout: Document volume, pipeline & trend surfaced first */}
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
        </>
      )}
    </div>
  )
}
