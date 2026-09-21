const workflowSteps = [
  'Intent Detection',
  'Query Planning',
  'Multi-Source Retrieval',
  'Extraction / Calculation',
  'Cross-Validation',
  'Evidence Mapping',
  'Confidence Verification',
]

export default function StepIndicator({ activeStep = 0, loading = false }) {
  return (
    <div
      className="processing-verification-status"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        margin: '16px 0',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--navy-900)' }}>
          {loading ? '⚙ Executing Multi-Source Extraction Pipeline...' : '✓ AI Audit & Verification Pipeline Complete'}
        </div>
        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
          Step {Math.min(activeStep + 1, workflowSteps.length)} of {workflowSteps.length}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
        {workflowSteps.map((step, index) => {
          const isDone = index < activeStep
          const isCurrent = loading && index === activeStep

          return (
            <div
              key={step}
              style={{
                flex: 1,
                minWidth: '95px',
                padding: '6px 8px',
                background: isCurrent ? 'var(--navy-800)' : isDone ? 'var(--surface-strong)' : 'transparent',
                color: isCurrent ? 'var(--white)' : isDone ? 'var(--text-primary)' : 'var(--text-muted)',
                border: isCurrent ? '1px solid var(--navy-900)' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: isCurrent || isDone ? 600 : 400,
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              {isDone ? '✓ ' : ''}{step}
            </div>
          )
        })}
      </div>
    </div>
  )
}
