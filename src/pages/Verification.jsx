import { useMemo, useState } from 'react'
import Card from '../components/ui/Card'
import ActionButtons from '../components/verification/ActionButtons'
import ConflictComparisonView from '../components/verification/ConflictComparisonView'
import VerificationQueueTable from '../components/verification/VerificationQueueTable'
import EvidenceExplorer from '../components/evidence/EvidenceExplorer'
import { EmptyState } from '../components/ui/StatePanel'
import { verificationQueueMock } from '../data/verificationMock'

const formatTimestamp = (date = new Date()) =>
  date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

export default function VerificationPage({ hideHeader = false }) {
  const [items, setItems] = useState(verificationQueueMock)
  const [selectedId, setSelectedId] = useState(verificationQueueMock[0].id)
  const [filter, setFilter] = useState('All')
  const [toastMessage, setToastMessage] = useState('')
  const [recentActions, setRecentActions] = useState([
    {
      id: 1,
      itemId: verificationQueueMock[0].id,
      action: 'Accepted',
      summary: 'Production figure accepted after field-level comparison.',
      timestamp: formatTimestamp(),
    },
  ])

  const flagTypes = useMemo(
    () => ['All', ...new Set(items.map((item) => item.flagType))],
    [items],
  )

  const filteredItems = useMemo(
    () => (filter === 'All' ? items : items.filter((item) => item.flagType === filter)),
    [items, filter],
  )

  const selectedItem =
    filteredItems.find((item) => item.id === selectedId) ||
    items.find((item) => item.id === selectedId) ||
    items[0]

  const handleAction = (action) => {
    if (!selectedItem) {
      return
    }

    const resolvedStatus =
      action === 'Accept'
        ? 'Accepted'
        : action === 'Correct'
          ? 'Corrected'
          : action === 'Reject'
            ? 'Rejected'
            : 'Resolved'

    setItems((current) =>
      current.map((item) => (item.id === selectedItem.id ? { ...item, status: resolvedStatus } : item)),
    )

    setRecentActions((current) => [
      {
        id: Date.now(),
        itemId: selectedItem.id,
        action: resolvedStatus,
        summary: `${selectedItem.itemType} marked as ${resolvedStatus.toLowerCase()} by reviewer.`,
        timestamp: formatTimestamp(),
      },
      ...current,
    ].slice(0, 8))

    setToastMessage(`✓ Conflict resolved (${resolvedStatus}) — System Data Quality updated`)
    window.setTimeout(() => setToastMessage(''), 3000)
  }

  return (
    <div className="verification-page">
      {!hideHeader && (
        <div className="page-header">
          <div>
            <p className="eyebrow">Verification</p>
            <h1>Review queue</h1>
          </div>
        </div>
      )}

      {toastMessage && (
        <div
          style={{
            background: 'var(--green-100)',
            border: '1px solid var(--tone-positive-border)',
            color: 'var(--green-600)',
            padding: '12px 18px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '13px',
            fontWeight: 700,
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {toastMessage}
        </div>
      )}

      <div className="verification-layout">
        <div className="verification-main">
          <Card className="verification-card verification-card--list">
            <div className="verification-toolbar">
              <div>
                <p className="eyebrow">Flags</p>
                <h2>Verification queue</h2>
              </div>
              <select className="documents-filter" value={filter} onChange={(event) => setFilter(event.target.value)}>
                {flagTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {filteredItems.length === 0 ? (
              <EmptyState
                title="No verification items match the current filter"
                description="Try choosing another flag type to continue the review queue."
              />
            ) : (
              <VerificationQueueTable items={filteredItems} selectedId={selectedId} onSelect={setSelectedId} />
            )}
          </Card>

          <Card className="verification-card">
            <ConflictComparisonView item={selectedItem} />
          </Card>

          <Card className="verification-card">
            <EvidenceExplorer evidence={selectedItem?.evidence} title={`${selectedItem?.itemType || 'Conflict'} evidence`} />
          </Card>
        </div>

        <div className="verification-side">
          <Card className="verification-card">
            <div className="section-header">
              <div>
                <p className="eyebrow">Review</p>
                <h2>Actions</h2>
              </div>
            </div>
            <ActionButtons onAction={handleAction} />
          </Card>

          <Card className="verification-card">
            <div className="section-header">
              <div>
                <p className="eyebrow">Audit trail</p>
                <h2>Recent actions</h2>
              </div>
            </div>

            <ul className="verification-log">
              {recentActions.map((entry) => (
                <li key={entry.id} className="verification-log__item">
                  <div className="verification-log__topline">
                    <strong>{entry.action}</strong>
                    <span>{entry.timestamp}</span>
                  </div>
                  <p>{entry.summary}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
