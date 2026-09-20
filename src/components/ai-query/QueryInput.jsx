import Button from '../ui/Button'
import Card from '../ui/Card'

export default function QueryInput({ question, onChange, onSubmit, examples, loading }) {
  return (
    <Card className="ai-query-panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">Natural Language Copilot</p>
          <h2>Query CMPDI Geological & Mining Intelligence</h2>
        </div>
        <span className="ui-badge ui-badge--neutral">Indexed 1,48,640 Documents</span>
      </div>

      <div className="ai-query__examples">
        {examples.map((example) => (
          <button
            key={example.id}
            type="button"
            className="ai-query__example"
            onClick={() => onChange(example.question)}
          >
            {example.question}
          </button>
        ))}
      </div>

      <div className="ai-query__composer">
        <textarea
          value={question}
          onChange={(event) => onChange(event.target.value)}
          rows={2}
          placeholder="Ask any question regarding production, reserves, coal quality, or dispatch variances..."
          className="ai-query__textarea"
        />

        <div className="ai-query__actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
            Press Generate to execute multi-subsidiary cross-validation pipeline
          </span>
          <Button onClick={onSubmit} disabled={loading}>
            {loading ? 'Executing Pipeline...' : 'Generate Answer'}
          </Button>
        </div>
      </div>
    </Card>
  )
}
