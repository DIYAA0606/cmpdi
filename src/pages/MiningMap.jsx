import { useMemo, useState } from 'react'
import IndiaMap from '../components/map/IndiaMap'
import LayerToggle from '../components/map/LayerToggle'
import StateDrilldownPanel from '../components/map/StateDrilldownPanel'
import { miningMapMock } from '../data/miningMapMock'

const layers = [
  'Production',
  'Dispatch',
  'Exploration Activity',
  'Reserves',
  'Data Quality',
]

const palette = {
  Production: '#1b3a57',
  Dispatch: '#2b4c7e',
  'Exploration Activity': '#5c7cfa',
  Reserves: '#0b7285',
  'Data Quality': '#1b7a43',
}

export default function MiningMapPage({ hideHeader = false }) {
  const [activeLayer, setActiveLayer] = useState('Production')
  const [selectedState, setSelectedState] = useState('Odisha')

  const selectedStateData = useMemo(
    () => miningMapMock[selectedState] || miningMapMock['Odisha'],
    [selectedState],
  )

  return (
    <div className="map-page-workspace">
      {!hideHeader && (
        <div className="page-header" style={{ marginBottom: '14px' }}>
          <div>
            <p className="eyebrow">Geospatial Intelligence</p>
            <h1>India Mining Operations Map</h1>
          </div>
        </div>
      )}

      {/* Sleek Minimal Layer Bar */}
      <LayerToggle layers={layers} activeLayer={activeLayer} onChange={setActiveLayer} />

      {/* Map-First Split Workspace: 75% Map Canvas + 25% Docked Regional Panel */}
      <div
        className="map-workspace-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 2.8fr) minmax(280px, 1fr)',
          gap: '20px',
          alignItems: 'start',
        }}
      >
        {/* Primary Map Canvas (Un-enclosed by outer card wrapper) */}
        <div
          className="map-primary-canvas"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            boxShadow: 'var(--shadow-card)',
            minHeight: '560px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--navy-900)' }}>
              Interactive Basin & Subsidiary Map
            </div>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
              Active Overlay: <strong>{activeLayer}</strong>
            </span>
          </div>

          <IndiaMap layerColor={palette[activeLayer]} onSelectState={setSelectedState} selectedState={selectedState} />
        </div>

        {/* Regional Docked Side Panel */}
        <div className="map-dock-sidebar">
          <StateDrilldownPanel stateData={selectedStateData} />
        </div>
      </div>
    </div>
  )
}
