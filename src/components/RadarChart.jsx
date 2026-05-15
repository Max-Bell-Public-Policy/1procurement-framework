import React from 'react'

/**
 * Custom SVG radar chart — no external library.
 * Props:
 *   criteria: [{ key, label, score, weight }]
 *   size: number (default 300)
 */
export default function RadarChart({ criteria, size = 300 }) {
  const validCriteria = criteria.filter(c => c.score !== null && c.score !== undefined)
  if (validCriteria.length < 3) {
    return (
      <div className="flex items-center justify-center text-slate text-sm" style={{ width: size, height: size }}>
        Insufficient scored criteria for radar chart
      </div>
    )
  }

  const n = validCriteria.length
  const center = size / 2
  const radius = size * 0.35
  const labelRadius = size * 0.48

  // Angles: start from top (-90 degrees), go clockwise
  const angles = validCriteria.map((_, i) => {
    const angle = (i * 2 * Math.PI) / n - Math.PI / 2
    return angle
  })

  const polarToCartesian = (r, angle) => ({
    x: center + r * Math.cos(angle),
    y: center + r * Math.sin(angle),
  })

  // Grid rings at 25%, 50%, 75%, 100%
  const gridLevels = [25, 50, 75, 100]

  const ringPoints = (level) => {
    const r = (level / 100) * radius
    return angles.map(a => polarToCartesian(r, a))
  }

  const pointsToPath = (pts) => {
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z'
  }

  // Score polygon
  const scorePoints = validCriteria.map((c, i) => {
    const r = (Math.min(c.score, 100) / 100) * radius
    return polarToCartesian(r, angles[i])
  })

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
      {/* Grid rings */}
      {gridLevels.map(level => (
        <path
          key={level}
          d={pointsToPath(ringPoints(level))}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
      ))}

      {/* Axis lines */}
      {angles.map((angle, i) => {
        const outer = polarToCartesian(radius, angle)
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={outer.x}
            y2={outer.y}
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        )
      })}

      {/* Score polygon */}
      <path
        d={pointsToPath(scorePoints)}
        fill="#1e3a5f"
        fillOpacity="0.25"
        stroke="#1e3a5f"
        strokeWidth="2"
      />

      {/* Score dots */}
      {scorePoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="4"
          fill="#1e3a5f"
        />
      ))}

      {/* Score labels at dots */}
      {scorePoints.map((p, i) => {
        const score = validCriteria[i].score
        // Position score label slightly offset from dot
        const angle = angles[i]
        const offset = 12
        const sx = p.x + offset * Math.cos(angle)
        const sy = p.y + offset * Math.sin(angle)
        return (
          <text
            key={i}
            x={sx}
            y={sy}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="9"
            fontWeight="600"
            fill="#1e3a5f"
          >
            {score}
          </text>
        )
      })}

      {/* Axis labels */}
      {validCriteria.map((c, i) => {
        const pt = polarToCartesian(labelRadius, angles[i])
        // Adjust text anchor based on position
        let anchor = 'middle'
        const cosVal = Math.cos(angles[i])
        if (cosVal > 0.2) anchor = 'start'
        else if (cosVal < -0.2) anchor = 'end'

        return (
          <text
            key={i}
            x={pt.x}
            y={pt.y}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize="10"
            fontWeight="600"
            fill="#334155"
          >
            {c.key}: {c.label}
          </text>
        )
      })}

      {/* Center dot */}
      <circle cx={center} cy={center} r="2" fill="#94a3b8" />

      {/* Grid level labels */}
      {gridLevels.map(level => {
        const r = (level / 100) * radius
        return (
          <text
            key={level}
            x={center + 3}
            y={center - r - 2}
            fontSize="8"
            fill="#94a3b8"
          >
            {level}
          </text>
        )
      })}
    </svg>
  )
}
