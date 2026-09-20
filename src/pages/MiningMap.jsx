import { useMemo, useState } from 'react'
import Card from '../components/ui/Card'
import IndiaMap from '../components/map/IndiaMap'
import LayerToggle from '../components/map/LayerToggle'
import StateDrilldownPanel from '../components/map/StateDrilldownPanel'
import { miningMapMock } from '../data/miningMapMock'

const layers = ['Production', 'Growth', 'Dispatch', 'Resources', 'Reserves', 'Exploration Activity', 'Number of Reports', 'Historical Activity', 'Data Quality', 'Data Conflicts']

const palette = {
  Production: '#2e7ab5',
  Growth: '#4ca88c',
  Dispatch: '#9b7ae8',
  Resources: '#e49a1d',
  Reserves: '#3aa9c8',
  'Exploration Activity': '#7b66dd',
  'Number of Reports': '#d06ea8',
  'Historical Activity': '#2b6b8f',
  'Data Quality': '#6ca15f',
  'Data Conflicts': '#d25d5d',
}

export default function MiningMapPage() {
  const [activeLayer, setActiveLayer] = useState('Production')
  const [selectedState, setSelectedState] = useState('Odisha')

  const selectedStateData = useMemo(
    () => miningMapMock[selectedState] || miningMapMock['Odisha'],
    [selectedState],
  )

  return (
    <div className="map-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Mining intelligence map</p>
          <h1>India state overlay</h1>
        </div>
      </div>

      <div className="map-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 0.85fr) minmax(0, 1.4fr)', gap: '20px', alignItems: 'start' }}>
        <Card className="map-card map-card--detail">
          <StateDrilldownPanel stateData={selectedStateData} />
        </Card>

        <Card className="map-card map-card--map">
          <div className="section-header">
            <div>
              <p className="eyebrow">Geospatial Overlay</p>
              <h2>India Coal Sector Operations Map</h2>
            </div>
          </div>
          <LayerToggle layers={layers} activeLayer={activeLayer} onChange={setActiveLayer} />
          <IndiaMap layerColor={palette[activeLayer]} onSelectState={setSelectedState} selectedState={selectedState} />
        </Card>
      </div>
    </div>
  )
}
