import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import EvidenceExplorer from '../evidence/EvidenceExplorer'
import Badge from '../ui/Badge'

const toneMap = {
  green: 'success',
  yellow: 'warning',
  orange: 'warning',
  red: 'danger',
}

export default function AnswerCard({ answer, selectedEvidence, onViewEvidence }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('findings')

  if (!answer) {
    return null
  }

  const handleFlagForVerification = () => {
    navigate('/data-quality', {
      state: {
        flaggedItem: {
          id: `FLAG-AI-${Date.now()}`,
          title: `Flagged AI Query: ${answer.title}`,
          summary: answer.summary,
        },
      },
    })
  }

  return (
    <div
      className="ai-research-response"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '24px',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Response Title & Audit Trust Header */}
      <div
        className="response-header"
        style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '14px',
          marginBottom: '16px',
        }}
      >
        <div>
          <p className="eyebrow" style={{ color: 'var(--cyan-600)', fontWeight: 700 }}>
            AI Research Response
          </p>
          <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '2px 0 0', color: 'var(--text-primary)' }}>
            {answer.title}
          </h2>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Badge tone={answer.overallConfidence >= 85 ? 'success' : answer.overallConfidence >= 70 ? 'warning' : 'danger'}>
            {answer.overallConfidence}% Confidence
          </Badge>
          <Badge tone="neutral">Cross-Validated Proof</Badge>
          <button
            type="button"
            onClick={handleFlagForVerification}
            style={{
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--amber-600)',
              background: 'var(--amber-100)',
              border: '1px solid var(--tone-caution-border)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
            }}
            title="Flag discrepancy for human verification"
          >
            🚩 Flag for Verification
          </button>
        </div>
      </div>

      {/* Executive Findings Section */}
      <div className="executive-findings" style={{ marginBottom: '20px' }}>
        <h3
          style={{
            fontSize: 'var(--font-size-sm)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--text-secondary)',
            marginBottom: '8px',
          }}
        >
          Executive Summary
        </h3>
        <p
          style={{
            fontSize: 'var(--font-size-md)',
            lineHeight: 1.6,
            color: 'var(--text-primary)',
            margin: 0,
          }}
        >
          {answer.summary}
        </p>
      </div>

      <hr style={{ border: '0', borderTop: '1px solid var(--border-subtle)', margin: '18px 0' }} />

      {/* View Selector Tabs */}
      <div
        className="response-tabs"
        role="tablist"
        style={{
          display: 'flex',
          gap: '4px',
          borderBottom: '1px solid var(--border)',
          marginBottom: '18px',
        }}
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'findings'}
          className={`ui-tab ${activeTab === 'findings' ? 'ui-tab--active' : ''}`}
          onClick={() => setActiveTab('findings')}
        >
          Key Findings & Citations
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'data'}
          className={`ui-tab ${activeTab === 'data' ? 'ui-tab--active' : ''}`}
          onClick={() => setActiveTab('data')}
        >
          Supporting Analysis & Data
        </button>
      </div>

      {/* Key Findings & Sources Pane */}
      {activeTab === 'findings' && (
        <div className="findings-pane">
          <div style={{ marginBottom: '20px' }}>
            <h3
              style={{
                fontSize: 'var(--font-size-sm)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--text-secondary)',
                marginBottom: '12px',
              }}
            >
              Key Audit Findings
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {answer.findings.map((item) => (
                <li
                  key={item.id}
                  style={{
                    padding: '12px 14px',
                    background: 'var(--surface-strong)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <strong style={{ fontSize: 'var(--font-size-md)', color: 'var(--text-primary)', display: 'block' }}>
                      {item.label}
                    </strong>
                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                      {item.value}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Badge tone={toneMap[item.tone] || 'neutral'}>{item.tone}</Badge>
                    <button
                      type="button"
                      className="ui-button ui-button--ghost ui-button--sm"
                      onClick={() => onViewEvidence(item.evidence)}
                      style={{ fontSize: 'var(--font-size-xs)' }}
                    >
                      View Source Evidence
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Conflict Warning Block (if present) */}
          {answer.conflicts && answer.conflicts.length > 0 && (
            <div
              className="conflict-alert"
              style={{
                background: 'var(--tone-caution-soft)',
                border: '1px solid var(--tone-caution-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px',
                marginBottom: '20px',
              }}
            >
              <div style={{ fontWeight: 700, color: 'var(--amber-600)', fontSize: 'var(--font-size-sm)', marginBottom: '6px' }}>
                ⚠️ Flagged Discrepancies Requiring Review
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-primary)', fontSize: 'var(--font-size-sm)' }}>
                {answer.conflicts.map((conflict, index) => (
                  <li key={`${conflict.title || 'conflict'}-${index}`} style={{ marginBottom: '4px' }}>
                    <strong>{conflict.title}:</strong> {conflict.detail}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Sources / Evidence Chain */}
          {selectedEvidence && (
            <div className="sources-evidence-section" style={{ marginTop: '20px' }}>
              <h3
                style={{
                  fontSize: 'var(--font-size-sm)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-secondary)',
                  marginBottom: '10px',
                }}
              >
                Sources & Provenance Chain
              </h3>
              <EvidenceExplorer evidence={selectedEvidence} title={selectedEvidence.title} />
            </div>
          )}
        </div>
      )}

      {/* Supporting Analysis & Data Pane */}
      {activeTab === 'data' && (
        <div className="data-pane" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: 'var(--font-size-sm)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              Subsidiary Comparative Data
            </h3>
            <div className="ui-table-shell">
              <table className="ui-table">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>CCL (Mt)</th>
                    <th>WCL (Mt)</th>
                    <th>SECL (Mt)</th>
                  </tr>
                </thead>
                <tbody>
                  {answer.tableRows.map((row) => (
                    <tr key={row.year}>
                      <td><strong>{row.year}</strong></td>
                      <td>{row.ccl}</td>
                      <td>{row.wcl}</td>
                      <td>{row.secl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: 'var(--font-size-sm)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              5-Year Comparative Visual Trend
            </h3>
            <div style={{ background: 'var(--surface-strong)', padding: '16px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={answer.trendData}>
                  <defs>
                    <linearGradient id="cclFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#1e3a5f" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#1e3a5f" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="wclFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#0b7285" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#0b7285" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="seclFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#1b7a43" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#1b7a43" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e1e4e8" />
                  <XAxis dataKey="year" stroke="#486581" />
                  <YAxis stroke="#486581" />
                  <Tooltip />
                  <Area type="monotone" dataKey="CCL" stroke="#1e3a5f" fill="url(#cclFill)" strokeWidth={2.5} />
                  <Area type="monotone" dataKey="WCL" stroke="#0b7285" fill="url(#wclFill)" strokeWidth={2.5} />
                  <Area type="monotone" dataKey="SECL" stroke="#1b7a43" fill="url(#seclFill)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
