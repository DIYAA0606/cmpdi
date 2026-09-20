import { useEffect, useState } from 'react'
import Card from '../components/ui/Card'
import ExportButtons from '../components/reports/ExportButtons'
import ReportPreview from '../components/reports/ReportPreview'
import ReportScopeForm from '../components/reports/ReportScopeForm'
import { LoadingState, ErrorState } from '../components/ui/StatePanel'
import { reportsMock } from '../data/reportsMock'

const defaultForm = {
  timePeriod: '2025-26',
  subsidiaries: ['CCL', 'WCL', 'SECL'],
  metrics: ['Production', 'Dispatch', 'Quality'],
  requirements: ['Trend analysis', 'Comparative analysis'],
}

export default function ReportsPage({ hideHeader = false }) {
  const [form, setForm] = useState(defaultForm)
  const [report, setReport] = useState(reportsMock['2025-26'].CCL)
  const [loading, setLoading] = useState(false)

  const generateReport = () => {
    setLoading(true)
    const mainSubsidiary = form.subsidiaries[0] || 'CCL'
    const selected = reportsMock[form.timePeriod]?.[mainSubsidiary]

    window.setTimeout(() => {
      setReport(selected || reportsMock['2025-26'].CCL)
      setLoading(false)
    }, 1100)
  }

  useEffect(() => {
    setReport(reportsMock[form.timePeriod]?.[form.subsidiaries[0]] || reportsMock['2025-26'].CCL)
  }, [form.timePeriod])

  return (
    <div className="report-page">
      {!hideHeader && (
        <div className="page-header">
          <div>
            <p className="eyebrow">Reports</p>
            <h1>Automated report builder</h1>
          </div>
        </div>
      )}

      <div className="report-layout">
        <div className="report-main">
          <ReportScopeForm form={form} setForm={setForm} onGenerate={generateReport} loading={loading} />
          <Card className="report-card report-card--preview">
            <div className="report-toolbar">
              <div>
                <p className="eyebrow">Preview</p>
                <h2>Generated report preview</h2>
              </div>
              <ExportButtons />
            </div>
            {loading ? (
              <LoadingState title="Generating report preview" description="Compiling the latest metrics and validations for this view." />
            ) : report ? (
              <ReportPreview report={report} />
            ) : (
              <ErrorState title="Report preview unavailable" description="The selected report configuration could not be generated. Please try another scope." />
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
