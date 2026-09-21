import React, { useMemo, useState } from 'react'
import IndiaMap from '../components/map/IndiaMap'
import LayerToggle from '../components/map/LayerToggle'
import StateDrilldownPanel from '../components/map/StateDrilldownPanel'
import '../styles/DocumentsPage.css'
import {
  assetTypeOptions,
  coalfieldOptions,
  miningAssets,
  miningMapMock,
  sortOptions,
  subsidiaryOptions,
} from '../data/miningMapMock'

const layers = [
  'Production',
  'Dispatch',
  'Exploration Activity',
  'Reserves',
  'Data Quality',
]

const palette = {
  Production: '#123a3e',
  Dispatch: '#1c1d1f',
  'Exploration Activity': '#d9531e',
  Reserves: '#0e7490',
  'Data Quality': '#15803d',
}

function SearchIcon({ style }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true" style={style}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

export default function MiningMapPage() {
  const [activeLayer, setActiveLayer] = useState('Production')
  const [selectedState, setSelectedState] = useState('Odisha')
  const [selectedAsset, setSelectedAsset] = useState(miningAssets[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSub, setSelectedSub] = useState('All Subsidiaries')
  const [selectedCoalfield, setSelectedCoalfield] = useState('All Coalfields')
  const [selectedAssetType, setSelectedAssetType] = useState('All Asset Types')
  const [sortBy, setSortBy] = useState('name-asc')
  const [toast, setToast] = useState('')

  // State overview fallback data
  const selectedStateData = useMemo(
    () => miningMapMock[selectedState] || miningMapMock['Odisha'],
    [selectedState],
  )

  // Combined Search + Multi-Criteria Filtering
  const filteredAssets = useMemo(() => {
    let result = miningAssets.filter((asset) => {
      const matchesSearch =
        !searchQuery ||
        [asset.name, asset.subsidiary, asset.coalfield, asset.location, asset.assetType, asset.state]
          .join(' ')
          .toLowerCase()
          .includes(searchQuery.toLowerCase())

      const matchesSub = selectedSub === 'All Subsidiaries' || asset.subsidiary === selectedSub
      const matchesCoalfield = selectedCoalfield === 'All Coalfields' || asset.coalfield === selectedCoalfield
      const matchesType = selectedAssetType === 'All Asset Types' || asset.assetType === selectedAssetType

      return matchesSearch && matchesSub && matchesCoalfield && matchesType
    })

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name)
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name)
      if (sortBy === 'prod-desc') return (b.productionValue || 0) - (a.productionValue || 0)
      if (sortBy === 'subsidiary') return a.subsidiary.localeCompare(b.subsidiary)
      return 0
    })

    return result
  }, [searchQuery, selectedSub, selectedCoalfield, selectedAssetType, sortBy])

  const handleReset = () => {
    setSearchQuery('')
    setSelectedSub('All Subsidiaries')
    setSelectedCoalfield('All Coalfields')
    setSelectedAssetType('All Asset Types')
    setSortBy('name-asc')
  }

  const handleSelectAsset = (asset) => {
    setSelectedAsset(asset)
    if (asset.state) {
      setSelectedState(asset.state)
    }
  }

  const handleExportMap = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['ID,Name,Subsidiary,Coalfield,Type,State,Production,Status']
        .concat(
          filteredAssets.map(
            (a) =>
              `"${a.id}","${a.name}","${a.subsidiary}","${a.coalfield}","${a.assetType}","${a.state}","${a.annualProduction}","${a.status}"`,
          ),
        )
        .join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `CMPDI_Mining_Assets_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setToast(`Exported ${filteredAssets.length} asset record(s) to CSV.`)
    window.setTimeout(() => setToast(''), 2500)
  }

  return (
    <div className="mining-map-page">
      {toast && (
        <div className="mining-map-toast">{toast}</div>
      )}

      {/* Geospatial Intelligence Header */}
      <section className="platform-page-header">
        <p className="platform-kicker">GEOSPATIAL INTELLIGENCE</p>
        <h1>Mining Map &amp; Assets</h1>
        <p>
          Interactive geospatial view of coalfields, mines, and critical infrastructure across CIL subsidiaries for better planning, monitoring, and decision-making.
        </p>
      </section>

      {/* Operational Control Bar */}
      <section className="doc-control-bar">
        <div className="doc-upload-single">
          <button
            type="button"
            className="doc-upload-button-primary"
            onClick={handleExportMap}
          >
            <span>EXPORT MAP DATA</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
          <span className="doc-upload-subtext">SHP, KML, CSV (GIS Data)</span>
        </div>

        <div className="doc-filters-row">
          <div className="doc-search-box">
            <SearchIcon />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mines, coalfields, subsidiaries, or locations..."
            />
          </div>

          <select
            value={selectedSub}
            onChange={(e) => setSelectedSub(e.target.value)}
            className="doc-select-filter"
          >
            {subsidiaryOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>

          <select
            value={selectedCoalfield}
            onChange={(e) => setSelectedCoalfield(e.target.value)}
            className="doc-select-filter"
          >
            {coalfieldOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>

          <select
            value={selectedAssetType}
            onChange={(e) => setSelectedAssetType(e.target.value)}
            className="doc-select-filter"
          >
            {assetTypeOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>

          <button
            type="button"
            className="doc-reset-btn"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </section>

      <section className="mining-map-workspace">
        <aside className="mining-map-panel mining-map-panel--layers">
          <div className="mining-map-panel__header-row">
            <span>Map Layers</span>
            <button type="button" className="mining-map-link-button" onClick={handleReset}>Reset</button>
          </div>

          <div className="mining-map-layer-list">
            <label className="mining-map-check"><input type="checkbox" defaultChecked /><span>Coal Mines</span></label>
            <label className="mining-map-check"><input type="checkbox" defaultChecked /><span>Coalfields</span></label>
            <label className="mining-map-check"><input type="checkbox" defaultChecked /><span>Subsidiary Boundaries</span></label>
            <label className="mining-map-check"><input type="checkbox" /><span>Railway Network</span></label>
            <label className="mining-map-check"><input type="checkbox" /><span>Major Infrastructure</span></label>
            <label className="mining-map-check"><input type="checkbox" /><span>Environment Sensitive Areas</span></label>
            <label className="mining-map-check"><input type="checkbox" /><span>Satellite Imagery</span></label>
          </div>

          <div className="mining-map-divider" />

          <div className="mining-map-panel__header-row">
            <span>Map View</span>
          </div>

          <div className="mining-map-layer-list mining-map-layer-list--radio">
            <label className="mining-map-radio"><input type="radio" name="map-view-base" defaultChecked /><span>Standard</span></label>
            <label className="mining-map-radio"><input type="radio" name="map-view-base" /><span>Satellite</span></label>
            <label className="mining-map-radio"><input type="radio" name="map-view-base" /><span>Terrain</span></label>
            <label className="mining-map-radio"><input type="radio" name="map-view-base" /><span>Hybrid</span></label>
          </div>
        </aside>

        <div className="mining-map-canvas-panel">
          <IndiaMap
            layerColor={palette[activeLayer] || '#123a3e'}
            assets={filteredAssets}
            selectedAssetId={selectedAsset?.id}
            onSelectAsset={handleSelectAsset}
            onSelectState={setSelectedState}
            selectedState={selectedState}
          />
        </div>

        <aside className="mining-map-panel mining-map-panel--details">
          <StateDrilldownPanel
            selectedAsset={selectedAsset}
            stateData={selectedStateData}
            onClose={() => setSelectedAsset(null)}
          />
        </aside>
      </section>

      <section className="map-summary-row">
        <div className="map-summary-card">
          <div className="map-summary-card__icon">✦</div>
          <div className="map-summary-card__content">
            <strong>350+</strong>
            <span>Total Mines</span>
          </div>
        </div>
        <div className="map-summary-card">
          <div className="map-summary-card__icon">◫</div>
          <div className="map-summary-card__content">
            <strong>83</strong>
            <span>Coalfields</span>
          </div>
        </div>
        <div className="map-summary-card">
          <div className="map-summary-card__icon">▣</div>
          <div className="map-summary-card__content">
            <strong>7</strong>
            <span>CIL Subsidiaries</span>
          </div>
        </div>
        <div className="map-summary-card">
          <div className="map-summary-card__icon">⤢</div>
          <div className="map-summary-card__content">
            <strong>12,500+ km</strong>
            <span>Rail Connectivity</span>
          </div>
        </div>
      </section>
    </div>
  )
}
