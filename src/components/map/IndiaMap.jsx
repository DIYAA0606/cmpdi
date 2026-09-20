import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const states = [
  { name: 'Odisha', x: 290, y: 230 },
  { name: 'Jharkhand', x: 270, y: 260 },
  { name: 'Chhattisgarh', x: 220, y: 270 },
  { name: 'West Bengal', x: 300, y: 210 },
]

export default function IndiaMap({ layerColor, onSelectState, selectedState }) {
  return (
    <div className="india-map-shell">
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 520, center: [82, 23] }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name = geo.properties.name
              const isState = states.some((state) => state.name === name)
              const isSelected = selectedState === name

              if (!isState) {
                return null
              }

              const target = states.find((state) => state.name === name)

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => onSelectState(name)}
                  style={{
                    default: {
                      fill: isSelected ? '#1a3768' : layerColor,
                      stroke: '#ffffff',
                      strokeWidth: 0.8,
                      outline: 'none',
                      cursor: 'pointer',
                    },
                    hover: {
                      fill: '#3aa9c8',
                      outline: 'none',
                    },
                    pressed: {
                      fill: '#1a3768',
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
