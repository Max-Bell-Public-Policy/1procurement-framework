import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { scenarios } from '../data/scenarios'
import OverviewTab from './tabs/OverviewTab'
import TierOneTab from './tabs/TierOneTab'
import CriteriaTab from './tabs/CriteriaTab'
import CandidatesTab from './tabs/CandidatesTab'
import FinancialTab from './tabs/FinancialTab'
import SourcesTab from './tabs/SourcesTab'

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

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'tier1', label: 'Tier 1 Assessment' },
  { id: 'tier2', label: 'Tier 2 Analysis' },
  { id: 'candidates', label: 'Candidates' },
  { id: 'financial', label: 'Financial' },
  { id: 'sources', label: 'Sources' },
]

export default function ScenarioDetail() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('overview')
  const scenario = scenarios.find(s => s.id === id)

  if (!scenario) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-slate text-lg mb-4">Scenario not found.</p>
        <Link to="/" className="text-navy font-semibold hover:text-gold">← Back to scenarios</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back link */}
      <Link to="/" className="inline-flex items-center text-sm text-slate hover:text-navy mb-6 transition-colors">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to all scenarios
      </Link>

      {/* Title block */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`status-badge ${sectorColors[scenario.sector] || 'bg-gray-100 text-gray-700'}`}>
            {scenario.sector}
          </span>
          <span className={`status-badge ${priorityColors[scenario.priority] || 'bg-gray-400 text-white'}`}>
            {scenario.priority}
          </span>
          {scenario.analysisStatus === 'full' ? (
            <span className="status-badge bg-green-100 text-green-800">Full Analysis</span>
          ) : (
            <span className="status-badge bg-gray-100 text-gray-600">Landscape Assessment</span>
          )}
        </div>
        <h1 className="text-2xl font-bold text-navy leading-tight mb-3">{scenario.title}</h1>

        {/* Metadata row */}
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate">
          <span><span className="font-medium text-gray-700">Category:</span> {scenario.procurementCategory}</span>
          {scenario.composite !== null && (
            <span>
              <span className="font-medium text-gray-700">Composite Score:</span>{' '}
              <span className={`font-bold ${scenario.composite >= 65 ? 'text-green-700' : scenario.composite >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                {scenario.composite}/100
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex overflow-x-auto -mb-px">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-button whitespace-nowrap ${
                activeTab === tab.id ? 'tab-button-active' : 'tab-button-inactive'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div>
        {activeTab === 'overview' && <OverviewTab scenario={scenario} />}
        {activeTab === 'tier1' && <TierOneTab scenario={scenario} />}
        {activeTab === 'tier2' && <CriteriaTab scenario={scenario} />}
        {activeTab === 'candidates' && <CandidatesTab scenario={scenario} />}
        {activeTab === 'financial' && <FinancialTab scenario={scenario} />}
        {activeTab === 'sources' && <SourcesTab scenario={scenario} />}
      </div>
    </div>
  )
}
