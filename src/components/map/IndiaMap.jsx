const states = [
  { name: 'Odisha', x: 385, y: 326 },
  { name: 'Jharkhand', x: 300, y: 290 },
  { name: 'Chhattisgarh', x: 255, y: 340 },
  { name: 'West Bengal', x: 350, y: 245 },
]

export default function IndiaMap({ layerColor, onSelectState, selectedState }) {
  return (
    <div className="india-map-shell">
      <svg className="india-static-map" viewBox="0 0 640 520" role="img" aria-label="Static India map showing mining regions">
        <rect x="0" y="0" width="640" height="520" fill="#f6f5f3" />

        <g transform="translate(10 0)">
          <path
            d="M 212 60 L 252 42 L 294 38 L 346 52 L 390 62 L 408 90 L 430 118 L 450 146 L 468 178 L 494 214 L 522 258 L 534 292 L 526 326 L 512 354 L 500 390 L 476 420 L 466 454 L 440 496 L 398 500 L 362 480 L 340 452 L 324 434 L 286 430 L 252 410 L 222 396 L 192 350 L 170 314 L 144 286 L 126 242 L 130 208 L 154 180 L 176 152 L 182 120 L 212 60 Z"
            fill="#dfe8d8"
            stroke="#8fa395"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          <path
            d="M 224 84 L 260 146 L 286 176 L 314 198 L 332 224 L 356 234 L 396 230 L 412 208 L 430 180 L 442 154 L 430 118 L 404 104 L 362 94 L 324 72 L 286 70 L 242 74 Z"
            fill="rgba(18, 58, 62, 0.08)"
            stroke="rgba(18, 58, 62, 0.18)"
            strokeWidth="1.2"
          />

          <path
            d="M 286 160 L 330 186 L 350 204 L 372 232 L 366 260 L 346 290 L 312 300 L 292 278 L 278 252 L 262 228 L 274 196 Z"
            fill="rgba(18, 58, 62, 0.06)"
            stroke="rgba(18, 58, 62, 0.14)"
            strokeWidth="1.1"
          />

          <path d="M 150 250 L 185 260 L 208 292 L 196 332 L 155 332 L 138 290 Z" fill="rgba(18, 58, 62, 0.05)" />
          <path d="M 488 248 L 518 262 L 528 304 L 504 336 L 470 332 L 454 290 Z" fill="rgba(18, 58, 62, 0.05)" />
        </g>

        <g className="india-mining-markers">
          {states.map((state) => {
            const isSelected = selectedState === state.name
            return (
              <g key={state.name} onClick={() => onSelectState?.(state.name)} style={{ cursor: 'pointer' }}>
                <circle cx={state.x} cy={state.y} r={isSelected ? 8 : 6} fill={isSelected ? '#123a3e' : '#d9531e'} stroke="#fff" strokeWidth="2" />
                <circle cx={state.x} cy={state.y} r={isSelected ? 15 : 12} fill="none" stroke={isSelected ? 'rgba(18,58,62,0.18)' : 'rgba(217,83,30,0.18)'} strokeWidth="1.5" />
              </g>
            )
          })}
        </g>

        <g aria-hidden="true">
          <g fill="#d9d5cd" stroke="#d9d5cd" strokeWidth="0.8">
            <circle cx="98" cy="420" r="3" />
            <circle cx="518" cy="98" r="3" />
            <circle cx="430" cy="110" r="3" />
          </g>
        </g>
      </svg>

      <div className="india-map__legend">
        {states.map((state) => (
          <button
            key={state.name}
            type="button"
            className={`india-map__legend-item${selectedState === state.name ? ' is-active' : ''}`}
            onClick={() => onSelectState?.(state.name)}
          >
            {state.name}
          </button>
        ))}
      </div>
    </div>
  )
}
