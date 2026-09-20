export default function WordCloud({ items }) {
  return (
    <div className="word-cloud">
      {items.map((item) => {
        const size = Math.min(Math.max(16 + item.value * 0.18, 16), 32)

        return (
          <span
            key={item.label}
            className={`word-cloud__item word-cloud__item--${item.tone || 'steel'}`}
            style={{ fontSize: `${size}px` }}
          >
            {item.label}
          </span>
        )
      })}
    </div>
  )
}
