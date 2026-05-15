import React, { useState } from 'react'
import {
  criteriaDefinitions,
  weightMatrix,
  tier1Thresholds,
  tradeoffProtocols,
  governanceMatrix,
  documentationArtifacts,
  contextualAdjustments,
  decisionRules,
} from '../data/framework'

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-gray-200 rounded-sm mb-2">
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-navy text-sm">{title}</span>
        <svg
          className={`w-4 h-4 text-slate transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-4 pb-4 pt-1 text-sm text-gray-700">{children}</div>}
    </div>
  )
}

const tabs = [
  { id: 'tier1', label: 'Tier 1 Thresholds' },
  { id: 'tier2', label: 'Tier 2 Criteria' },
  { id: 'weights', label: 'Weight Matrix' },
  { id: 'protocols', label: 'Trade-off Protocols' },
  { id: 'governance', label: 'Governance' },
  { id: 'rules', label: 'Decision Rules' },
]

const statusConfig = {
  PASS: 'bg-green-100 text-green-800',
  CONDITIONAL_PASS: 'bg-amber-100 text-amber-800',
  FAIL: 'bg-red-600 text-white',
}

export default function FrameworkGuide() {
  const [activeTab, setActiveTab] = useState('tier1')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-navy mb-2">Framework Documentation</h2>
        <p className="text-gray-600 text-sm">
          Two-tier evaluation framework for government procurement in Québec. Tier 1 mandatory thresholds
          must pass before Tier 2 weighted scoring. Framework is legally compliant with CFTA, CETA, and CUSMA.
        </p>
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

      {/* Tab: Tier 1 */}
      {activeTab === 'tier1' && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600 mb-4">
            All five thresholds must be met before proceeding to Tier 2 evaluation. These apply universally
            to all procurement categories.
          </p>
          {Object.values(tier1Thresholds).map(t => (
            <Accordion key={t.code} title={`${t.code} — ${t.name}`} defaultOpen={t.code === 'T1'}>
              <p className="mb-3 leading-relaxed">{t.description}</p>
              <ul className="space-y-1 mb-3">
                {t.details.map((d, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-navy font-bold shrink-0 mt-0.5">·</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-red-50 border border-red-100 rounded-sm px-3 py-2 text-red-800 text-xs">
                <span className="font-semibold">Failure consequence:</span> {t.failureConsequence}
              </div>
            </Accordion>
          ))}
        </div>
      )}

      {/* Tab: Tier 2 Criteria */}
      {activeTab === 'tier2' && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600 mb-4">
            Weighted scoring on eight criteria, 0–100 per criterion. Weights vary by procurement category.
          </p>
          {Object.values(criteriaDefinitions).map(c => (
            <Accordion key={c.code} title={`${c.code} — ${c.name} (${c.abbr})`} defaultOpen={c.code === 'A'}>
              <div className="mb-3">
                <p className="font-medium text-gray-700 mb-2 text-xs uppercase tracking-wide">Sub-Criteria</p>
                <ul className="space-y-1">
                  {c.subCriteria.map((s, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-navy font-bold shrink-0">·</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-2 text-xs uppercase tracking-wide">Scoring Anchors</p>
                <div className="space-y-1">
                  {Object.entries(c.scoringAnchors).map(([range, desc]) => (
                    <div key={range} className="flex gap-3">
                      <span className={`status-badge shrink-0 ${
                        range.startsWith('90') ? 'bg-green-100 text-green-800' :
                        range.startsWith('70') ? 'bg-blue-100 text-blue-800' :
                        range.startsWith('50') ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>{range}</span>
                      <span className="leading-relaxed">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Accordion>
          ))}
        </div>
      )}

      {/* Tab: Weight Matrix */}
      {activeTab === 'weights' && (
        <div className="space-y-6">
          <p className="text-sm text-gray-600">
            Weight profiles vary by procurement category. Select the dominant category (by cost weight) or blend proportionally for multi-category procurements.
          </p>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="text-left px-4 py-3 font-semibold w-48">Criterion</th>
                    {Object.keys(weightMatrix).map(cat => (
                      <th key={cat} className="text-center px-3 py-3 font-semibold text-xs">{cat}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(criteriaDefinitions).map(([key, def], i) => (
                    <tr key={key} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-4 py-2.5 font-medium text-gray-700">
                        <span className="font-bold text-navy mr-1">{key}</span>
                        <span className="text-xs text-slate">{def.abbr}</span>
                      </td>
                      {Object.entries(weightMatrix).map(([cat, weights]) => (
                        <td key={cat} className="text-center px-3 py-2.5">
                          <span className={`font-semibold ${
                            weights[key] >= 20 ? 'text-navy' : weights[key] === 0 ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {weights[key]}%
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-bold">
                    <td className="px-4 py-2 text-gray-700">Total</td>
                    {Object.values(weightMatrix).map((weights, i) => {
                      const total = Object.values(weights).reduce((a, b) => a + b, 0)
                      return <td key={i} className="text-center px-3 py-2 text-navy">{total}%</td>
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Contextual adjustments */}
          <div className="card p-5">
            <h3 className="font-semibold text-navy mb-4 text-sm">Contextual Adjustment Triggers</h3>
            <p className="text-xs text-gray-600 mb-4">Three conditions automatically adjust weights by ±5–10 percentage points. Adjustments must be documented in the Procurement Strategy Record before RFP issue.</p>
            <div className="space-y-4">
              {contextualAdjustments.map((adj, i) => (
                <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="font-semibold text-gray-800 mb-1">{adj.name}</div>
                  <div className="text-xs text-slate mb-2">Trigger: {adj.trigger}</div>
                  <div className="space-y-1">
                    {adj.adjustments.map((a, j) => (
                      <div key={j} className="flex gap-3 text-xs">
                        <span className="font-medium text-gray-700 w-40 shrink-0">{a.criterion}</span>
                        <span className={`font-bold ${a.change.startsWith('+') ? 'text-blue-700' : a.change.startsWith('-') ? 'text-red-600' : 'text-amber-700'} w-20 shrink-0`}>{a.change}</span>
                        <span className="text-gray-600">{a.rationale}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Protocols */}
      {activeTab === 'protocols' && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600 mb-4">
            Six trade-off resolution protocols. Which protocols are triggered must be documented in the Procurement Strategy Record before RFP issue.
          </p>
          {Object.values(tradeoffProtocols).map(p => (
            <Accordion key={p.code} title={`${p.code} — ${p.name}`} defaultOpen={p.code === 'P1'}>
              <div className="mb-3">
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Trigger: </span>
                <span className="text-amber-800">{p.trigger}</span>
              </div>
              <div className="mb-3">
                <p className="font-medium text-gray-700 mb-2 text-xs uppercase tracking-wide">Decision Rule</p>
                <ol className="space-y-1">
                  {p.decisionRule.map((rule, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="font-bold text-navy shrink-0">{i + 1}.</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="bg-navy bg-opacity-5 border border-navy border-opacity-20 rounded-sm px-3 py-2 text-xs text-navy">
                <span className="font-semibold">Critical constraint:</span> {p.criticalConstraint}
              </div>
            </Accordion>
          ))}
        </div>
      )}

      {/* Tab: Governance */}
      {activeTab === 'governance' && (
        <div className="space-y-6">
          {/* Authority matrix */}
          <div className="card overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h3 className="font-semibold text-navy text-sm">Authority Matrix (Approval Authority by Contract Value)</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-4 py-2 font-semibold text-gray-700">Contract Value</th>
                  <th className="text-left px-4 py-2 font-semibold text-gray-700">Approval Authority</th>
                  <th className="text-left px-4 py-2 font-semibold text-gray-700">Additional Requirements</th>
                </tr>
              </thead>
              <tbody>
                {governanceMatrix.map((row, i) => (
                  <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-4 py-2.5 font-semibold text-navy">{row.value}</td>
                    <td className="px-4 py-2.5 text-gray-700">{row.authority}</td>
                    <td className="px-4 py-2.5 text-slate text-xs">{row.additional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Documentation artifacts */}
          <div className="card p-5">
            <h3 className="font-semibold text-navy mb-4 text-sm">Five Mandatory Documentation Artifacts (Contracts &gt;$10M)</h3>
            <ol className="space-y-3">
              {documentationArtifacts.map((a, i) => (
                <li key={i} className="flex gap-3 text-sm border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <span className="font-bold text-navy shrink-0 w-4">{i + 1}.</span>
                  <div>
                    <p className="font-semibold text-gray-800">{a.name}</p>
                    <p className="text-gray-600 mt-0.5">{a.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Post-mortem & calibration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card p-5 text-sm">
              <h3 className="font-semibold text-navy mb-3">Post-Mortem Requirements</h3>
              <p className="text-gray-600 mb-2">Mandatory at:</p>
              <ul className="space-y-1 text-gray-600">
                {['Contract close', '50% delivery milestone', '100% delivery milestone', '5-year operating anniversary'].map((m, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-navy">·</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate text-xs mt-2">Post-mortem report to be reviewed by AMP.</p>
            </div>
            <div className="card p-5 text-sm">
              <h3 className="font-semibold text-navy mb-3">Biennial Calibration Cycle</h3>
              <ul className="space-y-1 text-gray-600">
                {[
                  'Review weight profiles against outcomes from completed procurements',
                  'Adjust scoring anchors based on market evidence',
                  'Update contextual adjustment triggers based on fiscal and security conditions',
                  'Publish revised framework with changelog',
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-navy">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Decision Rules */}
      {activeTab === 'rules' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Critical decision rules that cannot be overridden without formal Ministerial justification and public disclosure.
          </p>
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="text-left px-4 py-3 font-semibold w-48">Rule</th>
                  <th className="text-left px-4 py-3 font-semibold">Description</th>
                  <th className="text-center px-4 py-3 font-semibold w-20">Protocol</th>
                </tr>
              </thead>
              <tbody>
                {decisionRules.map((rule, i) => (
                  <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-4 py-3 font-semibold text-navy align-top">{rule.rule}</td>
                    <td className="px-4 py-3 text-gray-700 leading-relaxed">{rule.description}</td>
                    <td className="px-4 py-3 text-center align-top">
                      {rule.protocol ? (
                        <span className="status-badge bg-navy text-white">{rule.protocol}</span>
                      ) : (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card p-5 text-sm">
            <h3 className="font-semibold text-navy mb-3">Framework Application Guidance</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                'Identify the correct procurement category from the five profiles. If the procurement spans multiple categories, use the dominant category (by cost weight) or blend weights proportionally.',
                'Apply contextual adjustments based on current fiscal, security, and market conditions at the time of procurement.',
                'Run all five Tier 1 thresholds first. Tier 2 scoring is not relevant if a Tier 1 threshold fails.',
                'Document which trade-off protocols are triggered before finalizing evaluation criteria — this should happen during Procurement Strategy Record development, before RFP issue.',
                'Limitations: The framework does not replace legal advice on trade agreement compliance; procurement counsel must review any evaluation criterion that could be challenged as a de facto local content mandate.',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-bold text-navy shrink-0">{i + 1}.</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  )
}
