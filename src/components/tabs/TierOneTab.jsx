import React from 'react'
import { tier1Thresholds } from '../../data/framework'

const statusConfig = {
  PASS: { label: 'PASS', class: 'bg-green-100 text-green-800' },
  CONDITIONAL_PASS: { label: 'CONDITIONAL PASS', class: 'bg-amber-100 text-amber-800' },
  CONDITIONAL_FAIL: { label: 'CONDITIONAL FAIL', class: 'bg-red-100 text-red-800' },
  FAIL: { label: 'FAIL', class: 'bg-red-600 text-white' },
  DEFERRED: { label: 'DEFERRED', class: 'bg-gray-100 text-gray-600' },
  'N/A': { label: 'N/A', class: 'bg-gray-100 text-gray-500' },
}

export default function TierOneTab({ scenario }) {
  const tier1 = scenario.tier1
  const isPartial = scenario.analysisStatus === 'landscape'

  return (
    <div className="space-y-4">
      {isPartial && (
        <div className="bg-amber-50 border border-amber-200 rounded-sm p-4 text-sm text-amber-800">
          <span className="font-semibold">Landscape Assessment:</span> Tier 1 assessment is preliminary.
          Some thresholds may not be fully evaluated pending RFP issue or formal procurement initiation.
        </div>
      )}

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-semibold text-gray-700 w-32">Threshold</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700 w-44">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Notes</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(tier1).map(([code, data], i) => {
              const def = tier1Thresholds[code]
              const config = statusConfig[data.status] || { label: data.status, class: 'bg-gray-100 text-gray-600' }
              return (
                <tr key={code} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="px-4 py-3 align-top">
                    <div className="font-bold text-navy">{code}</div>
                    <div className="text-xs text-slate mt-0.5">{def?.name}</div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <span className={`status-badge ${config.class}`}>{config.label}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 leading-relaxed">{data.notes}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Threshold definitions */}
      <div className="card p-5">
        <h3 className="font-semibold text-navy mb-4 text-sm uppercase tracking-wide">Threshold Definitions</h3>
        <div className="space-y-4">
          {Object.entries(tier1Thresholds).map(([code, def]) => (
            <div key={code} className="text-sm">
              <div className="flex gap-2 items-baseline mb-1">
                <span className="font-bold text-navy">{code}</span>
                <span className="font-medium text-gray-700">{def.name}</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-1">{def.description}</p>
              <p className="text-red-700 text-xs">
                <span className="font-semibold">Failure consequence:</span> {def.failureConsequence}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
