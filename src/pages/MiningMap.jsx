import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import IndiaMap from '../components/map/IndiaMap'
import LayerToggle from '../components/map/LayerToggle'
import StateDrilldownPanel from '../components/map/StateDrilldownPanel'
import { miningMapMock } from '../data/miningMapMock'
import '../styles/LandingPage.css'

const layers = [
  'Production',
  'Dispatch',
  'Exploration Activity',
  'Reserves',
  'Data Quality',
]

const palette = {
  Production: 'var(--navy-900)',
  Dispatch: 'var(--navy-700)',
  'Exploration Activity': 'var(--purple-500)',
  Reserves: 'var(--cyan-600)',
  'Data Quality': 'var(--green-600)',
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}

export default function MiningMapPage({ hideHeader = false }) {
  const [activeLayer, setActiveLayer] = useState('Production')
  const [selectedState, setSelectedState] = useState('Odisha')

  const selectedStateData = useMemo(
    () => miningMapMock[selectedState] || miningMapMock['Odisha'],
    [selectedState],
  )

  return (
    <div className="map-page-shell">
      <div className="landing-utility-bar">
        <div className="landing-shell landing-utility-bar__inner">
          <div className="landing-utility-meta">
            <span>Coal India Limited</span>
            <span>CMPDI / Central Mine Planning &amp; Design Institute</span>
          </div>
          <div className="landing-utility-links">
            <a href="#platform">Platform</a>
            <a href="#capabilities">Capabilities</a>
            <a href="#insight">Operations</a>
          </div>
        </div>
      </div>

      <header className="landing-header">
        <div className="landing-shell landing-header__inner">
          <div className="landing-brand" aria-label="CMPDI Mining Intelligence Platform">
            <div className="landing-logo-mark">CMPDI</div>
            <div className="landing-brand-text">
              <span className="landing-brand-title">Mining Intelligence Platform</span>
              <span className="landing-brand-subtitle">Coal India Limited</span>
            </div>
          </div>

          <nav className="landing-header-nav" aria-label="Main navigation">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/documents">Documents</Link>
            <Link to="/ai-intelligence">AI Intelligence</Link>
            <Link to="/reports">Reports</Link>
            <Link to="/mining-map" className="is-active">Mining Map</Link>
          </nav>

          <Link to="/dashboard" className="landing-header-cta">
            <span>Open Dashboard</span>
            <ArrowIcon />
          </Link>
        </div>
      </header>

      <main className="map-main landing-shell">
        <section className="map-intro">
          <p className="map-intro__eyebrow">Geospatial Intelligence</p>
          <h1>Mining Map &amp; Assets</h1>
          <p>Interactive geospatial view of coalfields, mines, and critical infrastructure across CIL subsidiaries for better planning, monitoring, and decision-making.</p>
        </section>

        <section className="map-controls">
          <div className="map-search">
            <span className="map-search__icon">⌕</span>
            <input type="text" placeholder="Search mines, coalfields, subsidiaries, or locations..." aria-label="Search mines and coalfields" />
          </div>

          <div className="map-selects">
            <button type="button" className="map-select">
              <span>All Subsidiaries</span>
              <span className="map-select__caret">▾</span>
            </button>
            <button type="button" className="map-select">
              <span>All Coalfields</span>
              <span className="map-select__caret">▾</span>
            </button>
            <button type="button" className="map-select">
              <span>All Asset Types</span>
              <span className="map-select__caret">▾</span>
            </button>
          </div>

          <button type="button" className="landing-header-cta landing-header-cta--small">
            <span>Export Map View</span>
            <ArrowIcon />
          </button>
        </section>

        <section className="map-workspace">
          <aside className="map-panel map-panel--layers">
            <div className="map-panel__label">Map Layers</div>
            <div className="map-layer-toggle">
              <LayerToggle layers={layers} activeLayer={activeLayer} onChange={setActiveLayer} />
            </div>

            <div className="map-panel__group">
              <div className="map-panel__label map-panel__label--secondary">Map View</div>
              <div className="map-view-list">
                <label className="map-view-item"><input type="radio" name="map-view" defaultChecked /> Standard</label>
                <label className="map-view-item"><input type="radio" name="map-view" /> Satellite</label>
                <label className="map-view-item"><input type="radio" name="map-view" /> Terrain</label>
                <label className="map-view-item"><input type="radio" name="map-view" /> Hybrid</label>
              </div>
            </div>
          </aside>

          <div className="map-canvas-panel">
            <IndiaMap layerColor={palette[activeLayer]} onSelectState={setSelectedState} selectedState={selectedState} />
          </div>

          <aside className="map-panel map-panel--details">
            <StateDrilldownPanel stateData={selectedStateData} />
          </aside>
        </section>

      </main>

      <footer className="landing-footer">
        <div className="landing-shell landing-footer__inner">
          <div className="landing-footer-brand-block">
            <div className="landing-footer-brand">Coal India Limited</div>
            <div className="landing-footer-text">A Maharatna Company</div>
          </div>

          <div className="landing-footer-brand-block landing-footer-brand-block--center">
            <div className="landing-footer-brand">CMPDI</div>
            <div className="landing-footer-text">Central Mine Planning &amp; Design Institute</div>
            <div className="landing-footer-text">Building a Sustainable Mining Future</div>
          </div>

          <div className="landing-footer-meta">
            <span>About</span>
            <span>Contact</span>
            <span>Help</span>
            <span>Privacy</span>
            <span>Terms</span>
            <span>© 2026 CMPDI. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
