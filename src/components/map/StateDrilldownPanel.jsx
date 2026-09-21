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
    <div className="map-selected-panel">
      <div className="map-selected-panel__header">
        <div className="map-selected-panel__label">Selected Asset</div>
        <button type="button" className="map-selected-panel__close" aria-label="Close selected asset">×</button>
      </div>

      <div className="map-selected-panel__asset">
        <div className="map-selected-panel__status">
          <span className="map-selected-panel__status-dot" />
          Operating
        </div>
        <h3>{stateData.mines[0] || stateData.state}</h3>
        <p>{stateData.subsidiaries[0] || 'Coal India'} / {stateData.state}</p>
      </div>

      <div className="map-selected-panel__stats">
        <div>
          <span>Area</span>
          <strong>450 sq km</strong>
        </div>
        <div>
          <span>Mines</span>
          <strong>{stateData.mines.length}</strong>
        </div>
        <div>
          <span>Annual Production</span>
          <strong>{stateData.production}</strong>
        </div>
      </div>

      <div className="map-selected-panel__content">
        <div className="map-selected-panel__section-title">Overview</div>
        <p>{stateData.summary}</p>

        <ul className="map-selected-panel__meta">
          <li><span>Key Mines</span><strong>{stateData.mines.join(', ')}</strong></li>
          <li><span>Primary Coal Type</span><strong>Coking Coal</strong></li>
          <li><span>Status</span><strong>Operational</strong></li>
        </ul>
      </div>

      <button type="button" onClick={handleAskAI} className="map-selected-panel__button">
        <span>View Detailed Report</span>
        <span>→</span>
      </button>
    </div>
  )
}
