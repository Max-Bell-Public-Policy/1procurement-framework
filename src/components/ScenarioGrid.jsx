import React, { useState, useMemo } from 'react'
import { scenarios } from '../data/scenarios'
import ScenarioCard from './ScenarioCard'

const sectors = ['All', 'Transit', 'Infrastructure', 'Defence', 'Digital', 'Energy']
const priorities = ['All', 'Critical', 'High', 'Medium', 'Deferred']

export default function ScenarioGrid() {
  const [activeSector, setActiveSector] = useState('All')
  const [activePriority, setActivePriority] = useState('All')

  const filtered = useMemo(() => {
    return scenarios.filter(s => {
      const sectorMatch = activeSector === 'All' || s.sector === activeSector
      const priorityMatch = activePriority === 'All' || s.priority === activePriority
      return sectorMatch && priorityMatch
    })
  }, [activeSector, activePriority])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Introduction */}
      <div className="mb-8 max-w-3xl">
        <p className="text-gray-700 leading-relaxed">
          This tool applies a structured two-tier evaluation framework to ten contested public procurement
          situations in Québec spanning transit, infrastructure, defence, digital systems, and energy.
          Two scenarios — PSE and CPSP — include full Tier 1 + Tier 2 analysis with candidate assessments
          and financial estimates. The remaining eight scenarios include landscape assessments and preliminary
          Tier 1 evaluations.
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-3 mb-8">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-slate uppercase tracking-wide w-16">Sector</span>
          {sectors.map(s => (
            <button
              key={s}
              onClick={() => setActiveSector(s)}
              className={`px-3 py-1 text-sm font-medium border rounded-sm transition-colors ${
                activeSector === s
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-navy hover:text-navy'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-slate uppercase tracking-wide w-16">Priority</span>
          {priorities.map(p => (
            <button
              key={p}
              onClick={() => setActivePriority(p)}
              className={`px-3 py-1 text-sm font-medium border rounded-sm transition-colors ${
                activePriority === p
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-navy hover:text-navy'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(scenario => (
          <ScenarioCard key={scenario.id} scenario={scenario} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate">
          No scenarios match the selected filters.
        </div>
      )}
    </div>
  )
}
