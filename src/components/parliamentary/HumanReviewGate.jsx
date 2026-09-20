export default function HumanReviewGate({ review, onApprove, onRevisionRequest }) {
  return (
    <div className="parliamentary-card parliamentary-card--review">
      <div className="section-header">
        <div>
          <p className="eyebrow">Mandatory review</p>
          <h2>Human approval gate</h2>
        </div>
        <span className={`parliamentary-status ${review?.approved ? 'parliamentary-status--final' : 'parliamentary-status--draft'}`}>
          {review?.approved ? 'Approved' : 'Awaiting review'}
        </span>
      </div>

      <div className="parliamentary-review__meta">
        <span>Reviewer</span>
        <strong>{review?.reviewer || 'Unassigned'}</strong>
        <span>Status</span>
        <strong>{review?.status || 'Awaiting approval'}</strong>
      </div>

      <div className="button-row">
        <button
          type="button"
          className="ui-button ui-button--success ui-button--md"
          onClick={onApprove}
          disabled={review?.approved}
        >
          Approve final response
        </button>
        <button type="button" className="ui-button ui-button--secondary ui-button--md" onClick={onRevisionRequest}>
          Request revision
        </button>
      </div>

      <p className="parliamentary-review__note">
        Final response state is not available until a human reviewer explicitly approves the draft.
      </p>
    </div>
  )
}
