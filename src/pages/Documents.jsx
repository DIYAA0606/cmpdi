import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import DocumentTable from '../components/documents/DocumentTable'
import UploadArea from '../components/documents/UploadArea'
import { EmptyState } from '../components/ui/StatePanel'
import { documentTypes, documentsMock, statuses } from '../data/documentsMock'

const ITEMS_PER_PAGE = 4

export default function DocumentsPage() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [page, setPage] = useState(1)
  const [exportToast, setExportToast] = useState('')

  const filtered = useMemo(
    () =>
      documentsMock.filter((document) => {
        const matchesSearch =
          !search ||
          [document.title, document.id, document.subsidiary, document.type]
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase())

        const matchesType = typeFilter === 'All' || document.type === typeFilter
        const matchesStatus = statusFilter === 'All' || document.status === statusFilter

        return matchesSearch && matchesType && matchesStatus
      }),
    [search, typeFilter, statusFilter],
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleExport = () => {
    const message = filtered.length
      ? `Export queued for ${filtered.length} filtered document${filtered.length > 1 ? 's' : ''}.`
      : 'No matching documents to export.'

    setExportToast(message)
    window.setTimeout(() => setExportToast(''), 2200)
  }

  return (
    <div className="documents-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Documents</p>
          <h1>Document Registry</h1>
        </div>
        <Button onClick={handleExport}>Export list</Button>
      </div>

      {exportToast && <div className="report-toast documents-export-toast">{exportToast}</div>}

      <div className="documents-toolbar">
        <div className="documents-toolbar__left">
          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value)
              setPage(1)
            }}
            placeholder="Search by title, ID, subsidiary, type"
            className="documents-search"
          />
          <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="documents-filter">
            {documentTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="documents-filter">
            {statuses.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="documents-toolbar__right">
          <Link to="/documents/DOC-CCL-2041" className="ui-button ui-button--secondary ui-button--md" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            Inspect Workspace
          </Link>
        </div>
      </div>

      <div className="documents-grid">
        <Card className="documents-list-card">
          {filtered.length === 0 ? (
            <EmptyState
              title="No documents match the active filters"
              description="Try clearing the search or changing the document type or status filters."
            />
          ) : (
            <DocumentTable documents={paginated} search={search} typeFilter={typeFilter} statusFilter={statusFilter} />
          )}
        </Card>

        <UploadArea />
      </div>

      <div className="documents-pagination">
        <Button variant="secondary" disabled={currentPage === 1} onClick={() => setPage((previous) => Math.max(1, previous - 1))}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button variant="secondary" disabled={currentPage === totalPages} onClick={() => setPage((previous) => Math.min(totalPages, previous + 1))}>
          Next
        </Button>
      </div>
    </div>
  )
}
