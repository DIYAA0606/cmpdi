import React, { useState } from 'react'
import Modal from './Modal'
import Button from './Button'
import Badge from './Badge'

const STEPS = [
  {
    step: 1,
    title: 'Dashboard & Operational Overview',
    subtitle: 'Step 1 of 3 — System Overview',
    icon: '📊',
    description:
      'Monitor real-time document volume, automated OCR ingestion pipelines, subsidiary production metrics, and model-based forecasts across Coal India subsidiaries.',
    highlights: [
      'Real-time KPI stat cards with trend analysis',
      '9-stage automated document intelligence pipeline',
      'Subsidiary performance breakdown (CCL, WCL, SECL, etc.)',
    ],
  },
  {
    step: 2,
    title: 'AI Copilot & Research Assistant',
    subtitle: 'Step 2 of 3 — AI Intelligence',
    icon: '🤖',
    description:
      'Ask natural language queries over thousands of unstructured mining logs, safety audits, and geological surveys with citation-backed answers.',
    highlights: [
      '5-level coordinate & page evidence provenance mapping',
      'Multi-source research response with comparative tables',
      'Topic intelligence clustering for operational trends',
    ],
  },
  {
    step: 3,
    title: 'Data Quality & Official Reporting',
    subtitle: 'Step 3 of 3 — Data Governance',
    icon: '🛡️',
    description:
      'Maintain system data trust (96.4%), resolve multi-subsidiary data discrepancies, and compile official Parliamentary Question responses.',
    highlights: [
      'Interactive review queue for human-in-the-loop verification',
      'Immutable audit trail logging all reviewer actions',
      'Automated report builder with PDF/DOCX export capabilities',
    ],
  },
]

export default function OnboardingWalkthrough({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0)

  if (!isOpen) return null

  const active = STEPS[currentStep]

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      onClose()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Platform Walkthrough">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Step Indicator & Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Badge tone="info">{active.subtitle}</Badge>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
            {currentStep + 1} / {STEPS.length}
          </div>
        </div>

        {/* Step Hero Box */}
        <div
          style={{
            background: 'var(--surface-strong)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              fontSize: '32px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              width: '52px',
              height: '52px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {active.icon}
          </div>

          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--navy-900)', margin: '0 0 6px' }}>
              {active.title}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              {active.description}
            </p>
          </div>
        </div>

        {/* Key Highlights */}
        <div>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: 'var(--text-muted)',
              marginBottom: '8px',
            }}
          >
            Key Capabilities in this View
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: '18px',
              fontSize: '12px',
              color: 'var(--text-primary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            {active.highlights.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Footer Actions */}
        <div
          style={{
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            marginTop: '12px',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '16px',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '12px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Skip Walkthrough
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            {currentStep > 0 && (
              <Button variant="secondary" onClick={handleBack}>
                Previous
              </Button>
            )}
            <Button onClick={handleNext}>
              {currentStep === STEPS.length - 1 ? 'Finish & Explore Platform' : 'Next Step →'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
