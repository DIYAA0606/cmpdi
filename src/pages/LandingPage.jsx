import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { dashboardSummary } from '../data/dashboardMock'
import '../styles/LandingPage.css'

const EXAMPLE_PROMPTS = [
  'Compare CCL and WCL production output for FY 2025-26',
  'Show mine safety audit discrepancies in SECL',
  'What is the environmental compliance status for MCL coalfields?',
]

export default function LandingPage() {
  const navigate = useNavigate()
  const [queryInput, setQueryInput] = useState('')

  const formattedDocs = dashboardSummary.documentsProcessed.toLocaleString('en-IN')

  const handleQuerySubmit = (e) => {
    e.preventDefault()
    const queryToUse = queryInput.trim() || EXAMPLE_PROMPTS[0]
    navigate('/ai-intelligence', { state: { initialQuery: queryToUse } })
  }

  const handlePillClick = (promptText) => {
    navigate('/ai-intelligence', { state: { initialQuery: promptText } })
  }

  return (
    <div className="landing-page">
      {/* 1. Header Navbar */}
      <header className="landing-header">
        <div className="landing-brand">
          <div className="landing-logo-mark">CIL</div>
          <div className="landing-brand-text">
            <span className="landing-brand-title">Mining Intelligence Platform</span>
            <span className="landing-brand-subtitle">CMPDI • Coal India Limited</span>
          </div>
        </div>

        <nav className="landing-nav-actions">
          <Link to="/dashboard" className="landing-btn-nav">
            <span>Enter Dashboard</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </nav>
      </header>

      {/* 2. Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-overlay" />
        <div className="landing-hero-content">
          <div className="landing-hero-badge">
            <span className="landing-hero-badge-dot" />
            Enterprise Decision Support System
          </div>

          <h1 className="landing-hero-title">
            CMPDI / Coal India Limited <br />
            <span className="landing-hero-title-highlight">Trustworthy Data for Coal Mining Oversight</span>
          </h1>

          <p className="landing-hero-subtitle">
            Streamlined document intelligence, automated conflict verification, and spatial reporting 
            for Coal India Limited.
          </p>

          <Link to="/dashboard" className="landing-btn-hero-primary">
            <span>Enter Dashboard</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          {/* Interactive AI Query Hook Input */}
          <div className="landing-query-hook">
            <div className="landing-query-hook-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Test AI Copilot Query (Direct Demo Hook)</span>
            </div>

            <form onSubmit={handleQuerySubmit} className="landing-query-input-wrap">
              <input
                type="text"
                className="landing-query-input"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="e.g. Compare CCL and WCL production output for FY 2025-26..."
              />
              <button type="submit" className="landing-btn-query">
                Ask AI Copilot →
              </button>
            </form>

            <div className="landing-prompt-pills">
              <span className="landing-prompt-label">Example queries:</span>
              {EXAMPLE_PROMPTS.map((promptText, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="landing-prompt-pill"
                  onClick={() => handlePillClick(promptText)}
                >
                  {promptText}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stat Highlight Strip (3 Restrained Numbers) */}
      <section className="landing-stats-strip">
        <div className="landing-stats-container">
          <div className="landing-stat-item">
            <div className="landing-stat-value">{formattedDocs}</div>
            <div className="landing-stat-label">Ingested Documents</div>
            <div className="landing-stat-desc">Mine safety logs, production registers & survey files</div>
          </div>

          <div className="landing-stat-item">
            <div className="landing-stat-value">96.4%</div>
            <div className="landing-stat-label">Extraction Accuracy</div>
            <div className="landing-stat-desc">5-level page, section & coordinate bounding box proof</div>
          </div>

          <div className="landing-stat-item">
            <div className="landing-stat-value">{dashboardSummary.automationRate}%</div>
            <div className="landing-stat-label">Automation Rate</div>
            <div className="landing-stat-desc">Automated OCR and conflict flag detection</div>
          </div>
        </div>
      </section>

      {/* 4. Core Capability Highlights */}
      <section className="landing-section">
        <div className="landing-section-header">
          <h2 className="landing-section-title">Core Platform Capabilities</h2>
          <div className="landing-section-subtitle">
            Institutional tools built for operational oversight, regulatory compliance, and decision support.
          </div>
        </div>

        <div className="landing-capabilities-grid">
          {/* Card 1 */}
          <div className="landing-capability-card">
            <div className="landing-cap-header">
              <span className="landing-cap-badge">DOCS</span>
              <h3 className="landing-cap-title">Document Intelligence & Provenance</h3>
            </div>
            <p className="landing-cap-desc">
              Automated OCR parsing, structured table extraction, and 5-level coordinate bounding box 
              evidence mapping to verify underlying technical sources.
            </p>
            <ul className="landing-cap-list">
              <li className="landing-cap-item">
                <span className="landing-cap-item-bullet">✓</span>
                <span>Side-by-side original PDF preview with highlighted bounding boxes</span>
              </li>
              <li className="landing-cap-item">
                <span className="landing-cap-item-bullet">✓</span>
                <span>Automatic key-value table extraction & audit field validation</span>
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="landing-capability-card">
            <div className="landing-cap-header">
              <span className="landing-cap-badge">AI</span>
              <h3 className="landing-cap-title">AI Copilot & Research Assistant</h3>
            </div>
            <p className="landing-cap-desc">
              Natural language search and citation-backed question answering over thousands of unstructured 
              mining logs, geological surveys, and environmental filings.
            </p>
            <ul className="landing-cap-list">
              <li className="landing-cap-item">
                <span className="landing-cap-item-bullet">✓</span>
                <span>Cross-validated citation chains linked directly to source documents</span>
              </li>
              <li className="landing-cap-item">
                <span className="landing-cap-item-bullet">✓</span>
                <span>Topic clustering and automated anomaly detection</span>
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="landing-capability-card">
            <div className="landing-cap-header">
              <span className="landing-cap-badge">MAP</span>
              <h3 className="landing-cap-title">Geospatial Mining Intelligence</h3>
            </div>
            <p className="landing-cap-desc">
              Interactive SVG map of India's major coal basins, coalfield lease boundaries, regional 
              subsidiary profiles, and operational layer overlays.
            </p>
            <ul className="landing-cap-list">
              <li className="landing-cap-item">
                <span className="landing-cap-item-bullet">✓</span>
                <span>Basin-level drilldown into coalfield production metrics</span>
              </li>
              <li className="landing-cap-item">
                <span className="landing-cap-item-bullet">✓</span>
                <span>Spatial layer toggling for active mines & environmental buffers</span>
              </li>
            </ul>
          </div>

          {/* Card 4 */}
          <div className="landing-capability-card">
            <div className="landing-cap-header">
              <span className="landing-cap-badge">GOV</span>
              <h3 className="landing-cap-title">Data Quality & Operations Governance</h3>
            </div>
            <p className="landing-cap-desc">
              Multi-subsidiary conflict detection, automated quality metrics, human-in-the-loop review queues, 
              and comprehensive system audit logs.
            </p>
            <ul className="landing-cap-list">
              <li className="landing-cap-item">
                <span className="landing-cap-item-bullet">✓</span>
                <span>Conflict resolution workflow with risk severity scoring</span>
              </li>
              <li className="landing-cap-item">
                <span className="landing-cap-item-bullet">✓</span>
                <span>Immutable audit trail for regulatory and executive reporting</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Closing CTA Band */}
      <section className="landing-cta-band">
        <div className="landing-cta-container">
          <h2 className="landing-cta-title">Enter the Mining Intelligence Platform</h2>
          <p className="landing-cta-desc">
            Direct access to the executive operations dashboard, document workspace, AI copilot, and geospatial map.
          </p>
          <Link to="/dashboard" className="landing-btn-hero-primary">
            <span>Enter Dashboard</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* 6. Simple Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-container">
          <div>
            <div className="landing-footer-brand">
              Central Mine Planning & Design Institute Limited (CMPDI)
            </div>
            <div className="landing-footer-text">
              A Mini Ratna Category-I Public Sector Undertaking under Coal India Limited / Ministry of Coal, Government of India.
            </div>
          </div>
          <div className="landing-footer-text">
            © {new Date().getFullYear()} CMPDI / Coal India Limited. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
