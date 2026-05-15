import React, { useState } from 'react'
import { pse } from '../../data/pse'
import { cpsp } from '../../data/cpsp'

function ScoreBar({ score, max = 100 }) {
  if (score === null || score === undefined) return null
  const pct = Math.min((score / max) * 100, 100)
  const color = score >= 70 ? 'bg-green-500' : score >= 50 ? 'bg-amber-400' : 'bg-red-400'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-100 rounded-sm h-1.5">
        <div className={`h-1.5 rounded-sm ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-semibold text-gray-700 w-6 text-right">{score}</span>
    </div>
  )
}

function CandidateCard({ candidate, scoreKeys }) {
  return (
    <div className={`card p-4 ${candidate.integrityFlag ? 'border-l-4 border-amber-400' : ''}`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <h4 className="font-bold text-navy text-sm">{candidate.name}</h4>
          <div className="text-xs text-slate mt-0.5">{candidate.lot}</div>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="text-lg font-bold text-navy">{candidate.composite}</span>
          <span className="text-xs text-slate">/100</span>
          <span className={`status-badge text-xs ${
            candidate.position === 'Low' ? 'bg-green-100 text-green-800' :
            candidate.position === 'Mid' || candidate.position === 'Mid-High' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-700'
          }`}>
            {candidate.position} position
          </span>
        </div>
      </div>

      {candidate.integrityFlag && (
        <div className="bg-amber-50 border border-amber-200 rounded-sm p-2 text-xs text-amber-800 mb-3">
          <span className="font-semibold">Integrity flag: </span>{candidate.integrityNote}
        </div>
      )}

      <p className="text-xs text-gray-600 leading-relaxed mb-3">{candidate.profile}</p>

      {/* Score bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 mb-3">
        {scoreKeys.map(k => (
          candidate.scores[k] !== undefined && (
            <div key={k} className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate w-4">{k}</span>
              <div className="flex-1">
                <ScoreBar score={candidate.scores[k]} />
              </div>
            </div>
          )
        ))}
      </div>

      {/* Notes */}
      {candidate.notes && (
        <p className="text-xs text-slate italic border-t border-gray-100 pt-2">{candidate.notes}</p>
      )}
    </div>
  )
}

function PSECandidates() {
  const [activeLot, setActiveLot] = useState('civil')
  const lotMap = {
    civil: pse.candidates.civil,
    systems: pse.candidates.systems,
    rollingStock: pse.candidates.rollingStock,
    operations: pse.candidates.operations,
  }
  const lotLabels = {
    civil: 'Lot 1: Civil Works',
    systems: 'Lot 2: Systems',
    rollingStock: 'Lot 3: Rolling Stock',
    operations: 'Lot 4: Operations',
  }
  const scoreKeys = ['A', 'B', 'C', 'D', 'E', 'F', 'H']

  return (
    <div>
      {/* Lot tabs */}
      <div className="flex gap-2 flex-wrap mb-5">
        {Object.entries(lotLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveLot(key)}
            className={`px-3 py-1.5 text-xs font-medium border rounded-sm transition-colors ${
              activeLot === key
                ? 'bg-navy text-white border-navy'
                : 'bg-white text-gray-600 border-gray-300 hover:border-navy hover:text-navy'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {lotMap[activeLot].map((candidate, i) => (
          <CandidateCard key={i} candidate={candidate} scoreKeys={scoreKeys} />
        ))}
      </div>

      {/* Market observations */}
      <div className="card p-5 mt-5">
        <h3 className="font-semibold text-navy mb-3 text-sm">Market Observations</h3>
        <div className="space-y-3">
          {[
            { title: 'Quality-Cost Alignment', text: 'The TramCité execution advantage has created an unusual market condition where quality leaders (Tram Alliance civil, AtkinsRéalis/Siemens systems, Alstom rolling stock) are also expected low-bidders. Experienced teams carry less pricing risk — evaluation framework will not face significant tension between quality and cost on civil and systems.' },
            { title: 'Largest VFM Tension: Rolling Stock', text: 'CAF\'s potential $200M capital cost advantage over Alstom creates the primary Protocol 1 trigger. The analysis must compare: CAF\'s ~$200M capital savings vs. Alstom\'s Quebec economic benefits ($56M La Pocatière loan leverage, maintenance depot employment, engineering services). Independent net public return analysis required — the 1.5× threshold determines whether Quebec economic grounds support Alstom selection.' },
            { title: 'Operations NPV: Most Consequential Undisclosed Commitment', text: 'The 30-year operations NPV gap between STM (~$1.9B) and Keolis (~$2.9B) at 4% discount rate is approximately $1B. This dwarfs the rolling stock price differential and is entirely absent from public financial discussion.' },
          ].map((obs, i) => (
            <div key={i} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0 text-sm">
              <p className="font-semibold text-gray-800 mb-1">Observation {i + 1} — {obs.title}</p>
              <p className="text-gray-600 leading-relaxed">{obs.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CPSPCandidates() {
  const [selected, setSelected] = useState(0)
  const candidate = cpsp.candidates[selected]
  const scoreKeys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

  return (
    <div>
      {/* Candidate selector */}
      <div className="flex gap-2 flex-wrap mb-5">
        {cpsp.candidates.map((c, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`px-3 py-1.5 text-xs font-medium border rounded-sm transition-colors ${
              selected === i
                ? 'bg-navy text-white border-navy'
                : 'bg-white text-gray-600 border-gray-300 hover:border-navy hover:text-navy'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Candidate detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-bold text-navy">{candidate.name}</h3>
              <div className="text-sm text-slate">{candidate.country} &mdash; {candidate.platform}</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-navy">{candidate.composite}</div>
              <div className="text-xs text-slate">/100 composite</div>
            </div>
          </div>

          {/* Score bars */}
          <div className="space-y-1.5 mb-4">
            {scoreKeys.map(k => (
              <div key={k} className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate w-4">{k}</span>
                <div className="flex-1">
                  <ScoreBar score={candidate.scores[k]} />
                </div>
              </div>
            ))}
          </div>

          {/* Advantages */}
          <div className="mb-3">
            <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">Advantages</p>
            <ul className="space-y-1">
              {candidate.advantages.map((a, i) => (
                <li key={i} className="text-xs text-gray-600 flex gap-1.5">
                  <span className="text-green-600 font-bold shrink-0">+</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Concerns */}
          <div>
            <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-1">Concerns</p>
            <ul className="space-y-1">
              {candidate.concerns.map((c, i) => (
                <li key={i} className="text-xs text-gray-600 flex gap-1.5">
                  <span className="text-red-500 font-bold shrink-0">—</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Criterion rationale */}
        <div className="card p-5">
          <h4 className="font-semibold text-navy mb-3 text-sm">Criterion Rationale</h4>
          <div className="space-y-2">
            {scoreKeys.map(k => (
              <div key={k} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0 text-xs">
                <div className="flex gap-2 mb-0.5">
                  <span className="font-bold text-navy">{k}</span>
                  <span className="font-semibold text-gray-700">{candidate.scores[k]}/100</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{candidate.criteriaRationale[k]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Consolidated matrix */}
      <div className="card overflow-hidden mt-5">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h3 className="font-semibold text-navy text-sm">Consolidated Candidate Comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-3 py-2 font-semibold text-gray-700">Candidate</th>
                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'Composite'].map(k => (
                  <th key={k} className="text-center px-2 py-2 font-semibold text-gray-700 w-16">{k}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cpsp.consolidatedMatrix.rows.map((row, i) => (
                <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className={`px-3 py-2 font-medium ${i === 0 ? 'text-navy' : 'text-gray-700'}`}>
                    {row.name}
                    {i === 0 && <span className="ml-1 text-xs text-green-600 font-normal">(Recommended)</span>}
                  </td>
                  {row.scores.map((score, j) => (
                    <td key={j} className={`text-center px-2 py-2 font-semibold ${
                      j === row.scores.length - 1 ? 'text-navy font-bold' :
                      score >= 70 ? 'text-green-700' : score >= 60 ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {score}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 text-xs text-slate border-t border-gray-100">
          {cpsp.consolidatedMatrix.controllingCriterion}
        </div>
      </div>

      {/* Quebec Advocacy */}
      <div className="card p-5 mt-5">
        <h3 className="font-semibold text-navy mb-4 text-sm">Quebec Advocacy Framework</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cpsp.quebecAdvocacy.map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-sm p-3 text-sm">
              <div className="font-semibold text-navy mb-1">{item.action}: {item.title}</div>
              <p className="text-gray-600 text-xs leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CandidatesTab({ scenario }) {
  if (!['pse', 'cpsp'].includes(scenario.id)) {
    return (
      <div className="card p-8 text-center">
        <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <p className="text-gray-500 font-medium mb-1">Market candidates identified</p>
        <p className="text-sm text-slate">Full competitive assessment pending full framework analysis</p>
      </div>
    )
  }

  if (scenario.id === 'pse') return <PSECandidates />
  if (scenario.id === 'cpsp') return <CPSPCandidates />
  return null
}
