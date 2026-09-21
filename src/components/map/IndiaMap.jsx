import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

const geoUrl = 'https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson'

const states = [
  { name: 'Odisha', x: 290, y: 230 },
  { name: 'Jharkhand', x: 270, y: 260 },
  { name: 'Chhattisgarh', x: 220, y: 270 },
  { name: 'West Bengal', x: 300, y: 210 },
]

function getStateName(geo) {
  return (
    geo?.properties?.name ||
    geo?.properties?.NAME_1 ||
    geo?.properties?.st_nm ||
    geo?.properties?.state ||
    geo?.properties?.State ||
    geo?.properties?.NAME ||
    ''
  )
}

export default function IndiaMap({ layerColor, onSelectState, selectedState }) {
  return (
    <div className="india-map-shell">
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 620, center: [84, 23] }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name = getStateName(geo)
              const isState = states.some((state) => state.name === name)
              const isSelected = selectedState === name

              if (!isState) {
                return null
              }

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => onSelectState(name)}
                  style={{
                    default: {
                      fill: isSelected ? 'var(--navy-900)' : layerColor,
                      stroke: 'var(--surface)',
                      strokeWidth: 0.8,
                      outline: 'none',
                      cursor: 'pointer',
                    },
                    hover: {
                      fill: 'var(--steel-600)',
                      outline: 'none',
                    },
                    pressed: {
                      fill: 'var(--navy-900)',
                      outline: 'none',
                    },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
      <div className="india-map__legend">
        {states.map((state) => (
          <button key={state.name} type="button" className="india-map__legend-item" onClick={() => onSelectState(state.name)}>
            {state.name}
          </button>
        ))}
      </div>
    </div>
  )
}
