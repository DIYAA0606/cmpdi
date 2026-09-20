import Badge from '../ui/Badge'

export default function StateDrilldownPanel({ stateData }) {
  if (!stateData) {
    return null
  }

  return (
    <div className="state-drilldown">
      <div className="state-drilldown__header">
        <div>
          <p className="eyebrow">State Regional Profile</p>
          <h3>{stateData.state} Mining Region</h3>
        </div>
        <Badge tone="success">{stateData.confidence}% Audit Trust</Badge>
      </div>

      {/* Reference 1 inspired compact circular KPI meters */}
      <div className="state-kpi-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', margin: '14px 0', textAlign: 'center' }}>
        <div style={{ padding: '10px', background: 'var(--surface-strong)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--navy-800)' }}>{stateData.mines.length}</div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', fontWeight: 600 }}>Active Mines</div>
        </div>
        <div style={{ padding: '10px', background: 'var(--surface-strong)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--cyan-600)' }}>{stateData.production}</div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', fontWeight: 600 }}>Annual Yield</div>
        </div>
        <div style={{ padding: '10px', background: 'var(--surface-strong)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--green-600)' }}>{stateData.subsidiaries.length}</div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', fontWeight: 600 }}>Subsidiaries</div>
        </div>
      </div>

      <div className="state-drilldown__grid">
        <div>
          <div className="state-drilldown__label">Operating Subsidiaries</div>
          <div>{stateData.subsidiaries.join(', ')}</div>
        </div>
        <div>
          <div className="state-drilldown__label">Key Mine Sites</div>
          <div>{stateData.mines.join(', ')}</div>
        </div>
        <div>
          <div className="state-drilldown__label">Selected Overlay</div>
          <div>{stateData.layer}</div>
        </div>
      </div>

      <div className="state-drilldown__section">
        <div className="state-drilldown__label">Summary</div>
        <p>{stateData.summary}</p>
      </div>

      <div className="state-drilldown__section">
        <div className="state-drilldown__label">Related documents</div>
        <ul>
          {stateData.relatedDocuments.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="state-drilldown__section">
        <div className="state-drilldown__label">Anomalies</div>
        <ul>
          {stateData.anomalies.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="state-drilldown__section">
        <div className="state-drilldown__label">Conflicts</div>
        <ul>
          {stateData.conflicts.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
