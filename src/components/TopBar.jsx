import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { documentsMock } from '../data/documentsMock'
import { reportsMock } from '../data/reportsMock'

const notifications = [
  { id: 1, title: 'Document validation complete', detail: 'Annual Coal Production Report approved', unread: true },
  { id: 2, title: 'New evidence flagged', detail: 'WCL geology note requires review', unread: true },
  { id: 3, title: 'Report export ready', detail: '2025-26 summary package is available', unread: false },
]

export default function TopBar({ onMenuToggle }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return []
    }

    const documentResults = documentsMock
      .filter((document) => [document.title, document.id, document.subsidiary, document.type].join(' ').toLowerCase().includes(normalizedQuery))
      .map((document) => ({
        id: document.id,
        title: document.title,
        subtitle: `${document.subsidiary} · ${document.status}`,
        kind: 'document',
      }))

    const reportResults = Object.entries(reportsMock['2025-26'])
      .filter(([subsidiary]) => subsidiary.toLowerCase().includes(normalizedQuery))
      .map(([subsidiary]) => ({
        id: subsidiary,
        title: `${subsidiary} FY 2025-26 Report`,
        subtitle: 'Portfolio performance summary',
        kind: 'report',
      }))

    return [...documentResults, ...reportResults].slice(0, 6)
  }, [query])

  const unreadCount = notifications.filter((item) => item.unread).length

  const handleSelectResult = (item) => {
    setQuery('')

    if (item.kind === 'document') {
      navigate(`/documents/${item.id}`)
      return
    }

    navigate('/reports')
  }

  return (
    <header className="topbar">
      <button type="button" className="topbar__menu-toggle" aria-label="Toggle navigation menu" onClick={onMenuToggle}>
        <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
          <path d="M3 5.5h14M3 10h14M3 14.5h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </button>

      <div className="topbar__search-wrap">
        <div className="topbar__search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search reports, mines, documents..."
            aria-label="Global search"
          />
        </div>

        {query && (
          <div className="topbar__search-results" role="listbox" aria-label="Search results">
            {results.length ? (
              results.map((item) => (
                <button key={`${item.kind}-${item.id}`} type="button" className="topbar__result" onClick={() => handleSelectResult(item)}>
                  <strong>{item.title}</strong>
                  <span>{item.subtitle}</span>
                </button>
              ))
            ) : (
              <div className="topbar__no-results">No matching records found.</div>
            )}
          </div>
        )}
      </div>

      <div className="topbar__actions">
        <div className="topbar__notification-wrap">
          <button type="button" className="topbar__icon" aria-label="Notifications" onClick={() => setNotificationsOpen((state) => !state)}>
            🔔
            {unreadCount > 0 && <span className="topbar__badge">{unreadCount}</span>}
          </button>

          {notificationsOpen && (
            <div className="topbar__notification-panel" role="dialog" aria-label="Notification center">
              {notifications.map((item) => (
                <div key={item.id} className="topbar__notification-item">
                  <div className="topbar__notification-title">{item.title}</div>
                  <div className="topbar__notification-detail">{item.detail}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="topbar__profile">
          <div className="topbar__avatar">AK</div>
          <div className="topbar__profile-copy">
            <div className="topbar__name">Amit Kumar</div>
            <div className="topbar__role">Operations Director</div>
          </div>
        </div>
      </div>
    </header>
  )
}
