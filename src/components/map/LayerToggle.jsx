export default function LayerToggle({ layers, activeLayer, onChange }) {
  const primaryLayers = ['Production', 'Reserves', 'Exploration Activity', 'Data Quality']

  return (
    <div className="layer-toggle" style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {primaryLayers.map((layer) => (
          <button
            key={layer}
            type="button"
            className={`layer-toggle__button ${activeLayer === layer ? 'is-active' : ''}`}
            onClick={() => onChange(layer)}
          >
            {layer}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
        <label htmlFor="more-layers" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', fontWeight: 600 }}>
          All Overlays:
        </label>
        <select
          id="more-layers"
          className="ui-select"
          value={activeLayer}
          onChange={(e) => onChange(e.target.value)}
          style={{ padding: '4px 8px', fontSize: 'var(--font-size-xs)', borderRadius: 'var(--radius-sm)', width: 'auto' }}
        >
          {layers.map((layer) => (
            <option key={layer} value={layer}>
              {layer}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
