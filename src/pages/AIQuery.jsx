import { useEffect, useMemo, useState } from 'react'
import AnswerCard from '../components/ai-query/AnswerCard'
import QueryInput from '../components/ai-query/QueryInput'
import StepIndicator from '../components/ai-query/StepIndicator'
import { aiQueryExamples } from '../data/aiQueryMock'

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

function normalizeQuestion(value) {
  return value.trim().toLowerCase()
}

export default function AIQueryPage({ hideHeader = false }) {
  const [selectedQuestion, setSelectedQuestion] = useState(aiQueryExamples[0].question)
  const [answer, setAnswer] = useState(aiQueryExamples[0].answer)
  const [loading, setLoading] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [selectedEvidence, setSelectedEvidence] = useState(aiQueryExamples[0].answer.findings[0].evidence)

  useEffect(() => {
    if (!loading) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setActiveStep((current) => {
        if (current >= workflowSteps.length - 1) {
          return current
        }

        return current + 1
      })
    }, 260)

    return () => window.clearInterval(timer)
  }, [loading])

  const examples = useMemo(() => aiQueryExamples, [])

  const loadAnswerForQuestion = (question) => {
    const normalizedInput = normalizeQuestion(question)
    const match = examples.find(
      (example) =>
        normalizeQuestion(example.question) === normalizedInput ||
        normalizedInput.includes(normalizeQuestion(example.question)) ||
        normalizeQuestion(example.question).includes(normalizedInput),
    )

    const selected = match || examples[0]
    setSelectedQuestion(selected.question)
    setLoading(true)
    setActiveStep(0)

    window.setTimeout(() => {
      setAnswer(selected.answer)
      setSelectedEvidence(selected.answer.findings[0].evidence)
      setLoading(false)
      setActiveStep(workflowSteps.length - 1)
    }, 1200)
  }

  return (
    <div className="ai-query-page">
      {!hideHeader && (
        <div className="page-header">
          <div>
            <p className="eyebrow">AI Query</p>
            <h1>Copilot intelligence workspace</h1>
          </div>
        </div>
      )}

      <div className="ai-query-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <QueryInput
          question={selectedQuestion}
          onChange={setSelectedQuestion}
          onSubmit={() => loadAnswerForQuestion(selectedQuestion)}
          examples={examples}
          loading={loading}
        />

        {loading && <StepIndicator activeStep={activeStep} loading={loading} />}

        {!loading && answer && (
          <div className="ai-query-response-area">
            <AnswerCard
              answer={answer}
              selectedEvidence={selectedEvidence}
              onViewEvidence={(evidence) => setSelectedEvidence(evidence)}
            />
          </div>
        )}
      </div>
    </div>
  )
}
