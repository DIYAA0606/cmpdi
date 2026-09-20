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
import Card from '../ui/Card'

import { useState } from 'react'

const toneMap = {
  green: 'success',
  yellow: 'warning',
  orange: 'warning',
  red: 'danger',
}

export default function AnswerCard({ answer, selectedEvidence, onViewEvidence }) {
  const [activeTab, setActiveTab] = useState('findings')

  if (!answer) {
    return null
  }

  return (
    <Card className="ai-query-answer">
      <div className="ai-query-answer__header">
        <div>
          <p className="eyebrow">AI Copilot Analysis</p>
          <h2>{answer.title}</h2>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Badge tone={answer.overallConfidence >= 85 ? 'success' : answer.overallConfidence >= 70 ? 'warning' : 'danger'}>
            Confidence {answer.overallConfidence}%
          </Badge>
          <Badge tone="neutral">Audited Source</Badge>
        </div>
      </div>

      <p className="ai-query-answer__summary">{answer.summary}</p>

      <div className="ai-answer-tabs" role="tablist" style={{ display: 'flex', gap: '6px', borderBottom: '1px solid var(--border)', marginBottom: '16px', marginTop: '12px' }}>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'findings'}
          className={`ui-tab ${activeTab === 'findings' ? 'ui-tab--active' : ''}`}
          onClick={() => setActiveTab('findings')}
        >
          Executive Findings & Evidence
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'data'}
          className={`ui-tab ${activeTab === 'data' ? 'ui-tab--active' : ''}`}
          onClick={() => setActiveTab('data')}
        >
          Comparative Data & Visual Trend
        </button>
      </div>

      {activeTab === 'data' && (
        <div className="ai-query-data-pane">
          <div className="ai-query-section">
            <div className="section-header">
              <h3>Subsidiary Comparison Table</h3>
            </div>
            <div className="answer-card__table-wrap">
              <table className="answer-card__table">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>CCL</th>
                    <th>WCL</th>
                    <th>SECL</th>
                  </tr>
                </thead>
                <tbody>
                  {answer.tableRows.map((row) => (
                    <tr key={row.year}>
                      <td>{row.year}</td>
                      <td>{row.ccl}</td>
                      <td>{row.wcl}</td>
                      <td>{row.secl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="ai-query-section">
            <div className="section-header">
              <h3>Comparative Production Trend</h3>
            </div>
            <div className="ai-query-chart">
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={answer.trendData}>
                  <defs>
                    <linearGradient id="cclFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#244b70" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#244b70" stopOpacity={0.05} />
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
                  <CartesianGrid strokeDasharray="3 3" stroke="#d2dae2" />
                  <XAxis dataKey="year" stroke="#486581" />
                  <YAxis stroke="#486581" />
                  <Tooltip />
                  <Area type="monotone" dataKey="CCL" stroke="#244b70" fill="url(#cclFill)" strokeWidth={2.5} />
                  <Area type="monotone" dataKey="WCL" stroke="#0b7285" fill="url(#wclFill)" strokeWidth={2.5} />
                  <Area type="monotone" dataKey="SECL" stroke="#1b7a43" fill="url(#seclFill)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'findings' && (
        <div className="ai-query-findings-pane">
          <div className="ai-query-section">
            <div className="section-header">
              <h3>Key Findings with Audit Proof</h3>
            </div>

        <ul className="ai-query-findings">
          {answer.findings.map((item) => (
            <li key={item.id} className="ai-query-finding">
              <div className="ai-query-finding__header">
                <div>
                  <strong>{item.label}</strong>
                  <p>{item.value}</p>
                </div>
                <div className="ai-query-finding__meta">
                  <Badge tone={toneMap[item.tone] || 'neutral'}>{item.tone}</Badge>
                  <button type="button" className="ai-query-link" onClick={() => onViewEvidence(item.evidence)}>
                    View Evidence
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {answer.conflicts && answer.conflicts.length > 0 && (
        <div className="ai-query-section ai-query-warning">
          <div className="section-header">
            <h3>Detected conflicts</h3>
          </div>
          <ul className="ai-query-conflicts">
            {answer.conflicts.map((conflict, index) => (
              <li key={`${conflict.title || 'conflict'}-${index}`}>
                <div className="ai-query-conflict__title">
                  <Badge tone="warning">{conflict.tone || 'yellow'}</Badge>
                  <strong>{conflict.title}</strong>
                </div>
                <p>{conflict.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedEvidence && (
        <div className="ai-query-section ai-query-evidence">
          <EvidenceExplorer evidence={selectedEvidence} title={selectedEvidence.title} />
        </div>
      )}
        </div>
      )}
    </Card>
  )
}
