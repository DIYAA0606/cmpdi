import { useRef, useState } from 'react'
import Button from '../ui/Button'

export default function UploadArea() {
  const fileInputRef = useRef(null)
  const [files, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [status, setStatus] = useState('Ready for ingest')

  const queueFiles = (incomingFiles = []) => {
    const nextFiles = Array.from(incomingFiles).map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type || 'Unknown file',
    }))

    if (!nextFiles.length) return

    setFiles((previous) => [...previous, ...nextFiles])
    setStatus(`${nextFiles.length} file${nextFiles.length > 1 ? 's' : ''} queued for processing`)
    window.setTimeout(() => setStatus('Ready for ingest'), 1200)
  }

  return (
    <div
      className={`upload-area ${isDragging ? 'upload-area--dragging' : ''}`}
      onDragEnter={(event) => {
        event.preventDefault()
        setIsDragging(true)
      }}
      onDragOver={(event) => {
        event.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={(event) => {
        event.preventDefault()
        setIsDragging(false)
      }}
      onDrop={(event) => {
        event.preventDefault()
        setIsDragging(false)
        queueFiles(event.dataTransfer.files)
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        hidden
        onChange={(event) => {
          queueFiles(event.target.files)
          event.target.value = ''
        }}
      />

      <div className="upload-area__icon" aria-hidden="true">
        ⤴
      </div>
      <div className="upload-area__title">Upload documents</div>
      <div className="upload-area__subtitle">Drag and drop reports, scans, or PDFs to begin ingestion</div>

      {files.length > 0 && (
        <div className="upload-area__queue" aria-live="polite">
          {files.slice(-3).map((file) => (
            <div key={`${file.name}-${file.size}`} className="upload-area__queue-item">
              <span>{file.name}</span>
              <small>{Math.max(1, Math.round(file.size / 1024))} KB</small>
            </div>
          ))}
        </div>
      )}

      <div className="upload-area__status" aria-live="polite">
        {status}
      </div>

      <Button onClick={() => fileInputRef.current?.click()}>
        Select files
      </Button>
    </div>
  )
}
