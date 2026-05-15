import React from 'react'

export default function OverviewTab({ scenario }) {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="card p-6">
        <h3 className="font-semibold text-navy mb-3 text-base">Summary</h3>
        <p className="text-gray-700 leading-relaxed">{scenario.summary}</p>
      </div>

      {/* Historical Context */}
      <div className="card p-6">
        <h3 className="font-semibold text-navy mb-3 text-base">Historical Context</h3>
        <p className="text-gray-700 leading-relaxed">{scenario.historicalContext}</p>
      </div>

      {/* Key Challenges */}
      <div className="card p-6">
        <h3 className="font-semibold text-navy mb-3 text-base">Key Challenges</h3>
        <ul className="space-y-2">
          {scenario.challenges.map((challenge, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-700">
              <span className="text-navy font-bold mt-0.5 shrink-0">—</span>
              <span className="leading-relaxed">{challenge}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Verdict */}
      {scenario.verdict && (
        <div className="card p-6 border-l-4 border-navy">
          <h3 className="font-semibold text-navy mb-3 text-base">Framework Verdict</h3>
          <p className="text-gray-700 leading-relaxed">{scenario.verdict}</p>
        </div>
      )}

      {/* Pre-conditions */}
      {scenario.preConditions && scenario.preConditions.length > 0 && (
        <div className="card p-6">
          <h3 className="font-semibold text-navy mb-3 text-base">Pre-Conditions / Actions Required</h3>
          <ol className="space-y-2">
            {scenario.preConditions.map((condition, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-700">
                <span className="font-bold text-navy shrink-0 w-5">{i + 1}.</span>
                <span className="leading-relaxed">{condition}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Trade-off Protocols */}
      {scenario.tradeoffProtocols && scenario.tradeoffProtocols.length > 0 && (
        <div className="card p-6">
          <h3 className="font-semibold text-navy mb-3 text-base">Trade-off Protocols Triggered</h3>
          <div className="space-y-3">
            {scenario.tradeoffProtocols.map((p, i) => (
              <div key={i} className="flex gap-4 text-sm">
                <div className="shrink-0">
                  <span className={`status-badge ${
                    p.status === 'Triggered' ? 'bg-red-100 text-red-800' :
                    p.status === 'Active' ? 'bg-red-100 text-red-800' :
                    p.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {p.status}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{p.protocol}</p>
                  <p className="text-gray-600 mt-0.5">{p.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
