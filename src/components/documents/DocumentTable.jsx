import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Badge from '../ui/Badge'

export default function DocumentTable({ documents, search, typeFilter, statusFilter }) {
  const filteredDocuments = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return documents.filter((document) => {
      const matchesSearch =
        !normalizedSearch ||
        [document.title, document.id, document.subsidiary, document.type]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch)

      const matchesType = typeFilter === 'All' || document.type === typeFilter
      const matchesStatus = statusFilter === 'All' || document.status === statusFilter

      return matchesSearch && matchesType && matchesStatus
    })
  }, [documents, search, typeFilter, statusFilter])

  return (
    <div className="document-table-shell">
      <table className="document-table">
        <thead>
          <tr>
            <th>Document</th>
            <th>Type</th>
            <th>Subsidiary</th>
            <th>Date</th>
            <th>OCR</th>
            <th>Validation</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredDocuments.map((document) => (
            <tr key={document.id}>
              <td>
                <Link to={`/documents/${document.id}`} className="document-table__title">
                  {document.title}
                </Link>
                <div className="document-table__meta">{document.id}</div>
              </td>
              <td>{document.type}</td>
              <td>{document.subsidiary}</td>
              <td>{new Date(document.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
              <td>
                <Badge tone={document.ocrStatus === 'Completed' ? 'success' : 'neutral'}>{document.ocrStatus}</Badge>
              </td>
              <td>
                <Badge tone={document.validationStatus === 'Approved' ? 'success' : 'warning'}>{document.validationStatus}</Badge>
              </td>
              <td>
                <Badge
                  tone={
                    document.status === 'Validated'
                      ? 'success'
                      : document.status === 'Flagged'
                        ? 'danger'
                        : 'warning'
                  }
                >
                  {document.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
