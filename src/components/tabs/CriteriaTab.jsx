import React from 'react'
import RadarChart from '../RadarChart'
import { criteriaDefinitions } from '../../data/framework'

const criteriaLabels = {
  A: 'LEV',
  B: 'QCED',
  C: 'SCSS',
  D: 'Risk',
  E: 'Env',
  F: 'Social',
  G: 'Innovation',
  H: 'Integrity',
}

function ScoreBar({ score, max = 100 }) {
  if (score === null || score === undefined) {
    return <span className="text-xs text-slate italic">Not assessed</span>
  }
  const pct = Math.min((score / max) * 100, 100)
  const color = score >= 70 ? 'bg-green-500' : score >= 50 ? 'bg-amber-400' : 'bg-red-400'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-100 rounded-sm h-2">
        <div className={`h-2 rounded-sm ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-sm font-bold text-gray-700 w-8 text-right">{score}</span>
    </div>
  )
}

export default function CriteriaTab({ scenario }) {
  const isFull = scenario.analysisStatus === 'full'
  const tier2 = scenario.tier2

  if (!isFull) {
    return (
      <div className="space-y-4">
        <div className="card p-6">
          <div className="text-center py-8">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 font-medium mb-1">Full framework analysis not yet applied</p>
            <p className="text-sm text-slate mb-4">See Overview tab for preliminary assessment</p>
            <p className="text-sm text-gray-600">
              Likely weight profile: <span className="font-semibold text-navy">{scenario.procurementCategory}</span>
            </p>
          </div>
        </div>

        {/* Indicative rationales */}
        <div className="card p-5">
          <h3 className="font-semibold text-navy mb-4 text-sm">Indicative Rationale by Criterion</h3>
          <div className="space-y-3">
            {Object.entries(tier2).map(([key, data]) => {
              const def = criteriaDefinitions[key]
              return (
                <div key={key} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0 text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-navy w-5">{key}</span>
                    <span className="font-medium text-gray-700">{def?.name}</span>
                    <span className="text-slate text-xs">({data.weight}% weight)</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{data.rationale}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Full analysis
  const radarCriteria = Object.entries(tier2)
    .filter(([k, v]) => v.score !== null && v.weight > 0)
    .map(([key, data]) => ({
      key,
      label: criteriaLabels[key] || key,
      score: data.score,
      weight: data.weight,
    }))

  const compositeScore = scenario.composite

  return (
    <div className="space-y-6">
      {/* Composite score */}
      {compositeScore !== null && (
        <div className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <div className="text-xs font-semibold text-slate uppercase tracking-wide mb-1">Composite Score</div>
            <div className="text-4xl font-bold text-navy">{compositeScore}<span className="text-xl text-slate">/100</span></div>
          </div>
          <div className="flex-1">
            <div className="w-full bg-gray-100 rounded-sm h-3">
              <div
                className={`h-3 rounded-sm ${compositeScore >= 65 ? 'bg-green-500' : compositeScore >= 50 ? 'bg-amber-400' : 'bg-red-400'}`}
                style={{ width: `${compositeScore}%` }}
              />
            </div>
            <div className="text-xs text-slate mt-1">
              {compositeScore >= 65 ? 'Acceptable — proceed with conditions' :
               compositeScore >= 50 ? 'Marginal — significant concerns' :
               'Below threshold — fundamental issues must be resolved'}
            </div>
          </div>
        </div>
      )}

      {/* Radar chart + table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5 flex flex-col items-center">
          <h3 className="font-semibold text-navy mb-4 text-sm w-full">Criterion Scores — Radar View</h3>
          <RadarChart criteria={radarCriteria} size={280} />
        </div>

        {/* Score table */}
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-3 py-2 font-semibold text-gray-700">Criterion</th>
                <th className="text-right px-3 py-2 font-semibold text-gray-700 w-14">Weight</th>
                <th className="text-left px-3 py-2 font-semibold text-gray-700">Score</th>
                <th className="text-right px-3 py-2 font-semibold text-gray-700 w-16">Pts</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(tier2).map(([key, data], i) => {
                const def = criteriaDefinitions[key]
                const weighted = data.score !== null && data.weight > 0
                  ? ((data.score * data.weight) / 100).toFixed(2)
                  : null
                return (
                  <tr key={key} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-3 py-2">
                      <span className="font-bold text-navy">{key}</span>
                      <span className="ml-1.5 text-xs text-slate">{def?.abbr}</span>
                    </td>
                    <td className="px-3 py-2 text-right text-slate">{data.weight}%</td>
                    <td className="px-3 py-2 w-36">
                      <ScoreBar score={data.score} />
                    </td>
                    <td className="px-3 py-2 text-right font-semibold text-gray-700">
                      {weighted ?? <span className="text-gray-300">—</span>}
                    </td>
                  </tr>
                )
              })}
              <tr className="bg-navy text-white">
                <td colSpan={3} className="px-3 py-2 font-bold text-right">Composite</td>
                <td className="px-3 py-2 text-right font-bold">{compositeScore}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Rationale detail */}
      <div className="card p-5">
        <h3 className="font-semibold text-navy mb-4 text-sm">Criterion Rationale</h3>
        <div className="space-y-4">
          {Object.entries(tier2).map(([key, data]) => {
            const def = criteriaDefinitions[key]
            return (
              <div key={key} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-navy">{key}</span>
                  <span className="font-medium text-gray-700 text-sm">{def?.name}</span>
                  {data.score !== null && (
                    <span className={`text-sm font-bold ml-auto ${
                      data.score >= 70 ? 'text-green-700' : data.score >= 50 ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {data.score}/100
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{data.rationale}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
