import { useNavigate } from 'react-router-dom'
import Badge from '../ui/Badge'

export default function StateDrilldownPanel({ stateData }) {
  const navigate = useNavigate()

  if (!stateData) {
    return null
  }

  const handleAskAI = () => {
    navigate('/ai-intelligence', {
      state: {
        initialQuery: `What is the production output and data quality status for ${stateData.state} coalfields?`,
      },
    })
  }

  return (
    <div
      className="regional-dock-panel"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '20px',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Panel Header */}
      <div
        style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '12px',
          marginBottom: '14px',
        }}
      >
        <div>
          <p className="eyebrow" style={{ color: 'var(--text-secondary)' }}>
            Regional Intelligence Profile
          </p>
          <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '2px 0 0', color: 'var(--navy-900)' }}>
            {stateData.state}
          </h3>
        </div>
        <Badge tone={stateData.confidence >= 85 ? 'success' : 'warning'}>
          {stateData.confidence}% Audit Trust
        </Badge>
      </div>

      {/* Structured Metrics Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px',
          marginBottom: '16px',
        }}
      >
        <div style={{ background: 'var(--surface-strong)', padding: '10px 12px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', fontWeight: 600 }}>ANNUAL PRODUCTION</div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--navy-900)', marginTop: '2px' }}>{stateData.production}</div>
        </div>

        <div style={{ background: 'var(--surface-strong)', padding: '10px 12px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', fontWeight: 600 }}>OPERATING SUBSIDIARIES</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--steel-700)', marginTop: '2px' }}>{stateData.subsidiaries.join(', ')}</div>
        </div>
      </div>

      {/* Mines & Projects */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
          Mine Projects & Basins
        </div>
        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)', lineHeight: 1.5 }}>
          {stateData.mines.join(' • ')}
        </div>
      </div>

      {/* Regional Operational Briefing */}
      <div style={{ marginBottom: '14px', background: 'var(--surface-strong)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
        <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
          Geological & Operational Summary
        </div>
        <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)', lineHeight: 1.5 }}>
          {stateData.summary}
        </p>
      </div>

      {/* Anomalies & Data Quality Warnings */}
      {stateData.anomalies && stateData.anomalies.length > 0 && (
        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--amber-600)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
            ⚠️ Quality Anomalies & Variances
          </div>
          <ul style={{ margin: 0, paddingLeft: '16px', fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>
            {stateData.anomalies.map((item) => (
              <li key={item} style={{ marginBottom: '3px' }}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Linked Documents & Sources */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
          Linked Filings & Records
        </div>
        <ul style={{ margin: 0, paddingLeft: '16px', fontSize: 'var(--font-size-sm)', color: 'var(--steel-700)' }}>
          {stateData.relatedDocuments.map((item) => (
            <li key={item} style={{ marginBottom: '3px' }}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Cross-Screen Handoff Action to AI Intelligence */}
      <button
        type="button"
        onClick={handleAskAI}
        style={{
          width: '100%',
          padding: '10px 14px',
          fontSize: '12px',
          fontWeight: 700,
          color: '#ffffff',
          background: 'var(--steel-700)',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'background 0.15s ease',
        }}
      >
        <span>🤖 Ask AI Copilot about {stateData.state}</span>
      </button>
    </div>
  )
}
