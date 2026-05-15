import React from 'react'
import { Link } from 'react-router-dom'

const sectorColors = {
  Transit: 'bg-blue-100 text-blue-800',
  Infrastructure: 'bg-orange-100 text-orange-800',
  Defence: 'bg-red-100 text-red-800',
  Digital: 'bg-purple-100 text-purple-800',
  Energy: 'bg-green-100 text-green-800',
}

const priorityColors = {
  Critical: 'bg-red-600 text-white',
  High: 'bg-amber-500 text-white',
  Medium: 'bg-blue-500 text-white',
  Deferred: 'bg-gray-400 text-white',
}

export default function ScenarioCard({ scenario }) {
  const summaryExcerpt = scenario.summary.length > 160
    ? scenario.summary.slice(0, 160).trim() + '…'
    : scenario.summary

  return (
    <div className="card flex flex-col">
      <div className="p-5 flex-1 flex flex-col">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`status-badge ${sectorColors[scenario.sector] || 'bg-gray-100 text-gray-700'}`}>
            {scenario.sector}
          </span>
          <span className={`status-badge ${priorityColors[scenario.priority] || 'bg-gray-400 text-white'}`}>
            {scenario.priority}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-bold text-navy text-base leading-snug mb-2">
          {scenario.title}
        </h2>

        {/* Summary excerpt */}
        <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">
          {summaryExcerpt}
        </p>

        {/* Analysis status */}
        <div className="mb-4">
          {scenario.analysisStatus === 'full' ? (
            <div className="flex items-center gap-1.5 text-xs text-green-700 font-medium">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Full Analysis Available
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-slate font-medium">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Landscape Assessment
            </div>
          )}
        </div>
      </div>

      {/* Footer action */}
      <div className="border-t border-gray-100 px-5 py-3">
        <Link
          to={`/scenario/${scenario.id}`}
          className="text-sm font-semibold text-navy hover:text-gold transition-colors"
        >
          View Analysis →
        </Link>
      </div>
    </div>
  )
}
