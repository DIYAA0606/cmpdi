const workflowSteps = [
  'Question',
  'Intent Detection',
  'Query Planning',
  'Retrieval',
  'Extraction / Calculation',
  'Validation',
  'Cross-check',
  'Answer',
  'Evidence',
  'Confidence',
]

export default function StepIndicator({ activeStep = 0, loading = false }) {
  return (
    <div className="ai-query-workflow">
      <div className="ai-query-workflow__header">
        <p className="eyebrow">Workflow</p>
        <h3>{loading ? 'Generating answer...' : 'Verified reasoning flow'}</h3>
      </div>

      <div className="ai-query-workflow__steps">
        {workflowSteps.map((step, index) => (
          <div
            key={step}
            className={`ai-query-workflow__step ${index <= activeStep ? 'is-active' : ''} ${loading && index === activeStep ? 'is-current' : ''}`}
          >
            <span>{index + 1}</span>
            <small>{step}</small>
          </div>
        ))}
      </div>
    </div>
  )
}
