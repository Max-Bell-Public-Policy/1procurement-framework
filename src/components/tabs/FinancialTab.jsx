import React from 'react'
import { pse } from '../../data/pse'
import { cpsp } from '../../data/cpsp'

function fmt(n) {
  if (n === null || n === undefined) return 'Not disclosed'
  if (n >= 1000) return `$${(n / 1000).toFixed(2)}B`
  return `$${n}M`
}

function PSEFinancial() {
  return (
    <div className="space-y-6">
      {/* Program scenarios */}
      <div className="card overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h3 className="font-semibold text-navy text-sm">Program Scenarios</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 py-2 font-semibold text-gray-700">Scenario</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-700 max-w-xs">Assumptions</th>
                <th className="text-right px-4 py-2 font-semibold text-gray-700">Construction</th>
                <th className="text-right px-4 py-2 font-semibold text-gray-700">Ops NPV (30yr)</th>
                <th className="text-right px-4 py-2 font-semibold text-gray-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {pse.programScenarios.map((s, i) => (
                <tr key={i} className={`border-b border-gray-100 ${i === 1 ? 'bg-blue-50' : ''}`}>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {s.name}
                    {i === 1 && <span className="ml-1 text-xs text-blue-600">(base)</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{s.assumptions}</td>
                  <td className="px-4 py-3 text-right font-semibold">{fmt(s.construction)}</td>
                  <td className="px-4 py-3 text-right text-slate">{s.opsNPV ? fmt(s.opsNPV) : '—'}</td>
                  <td className={`px-4 py-3 text-right font-bold ${i === 1 ? 'text-navy' : 'text-gray-700'}`}>
                    {fmt(s.total)}{s.opsNPV === null ? '+' : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Risk-adjusted construction */}
      <div className="card overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h3 className="font-semibold text-navy text-sm">Risk-Adjusted Construction Estimates (by Lot)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 py-2 font-semibold text-gray-700">Lot</th>
                <th className="text-right px-4 py-2 font-semibold text-gray-700">Base</th>
                <th className="text-right px-4 py-2 font-semibold text-gray-700">Low</th>
                <th className="text-right px-4 py-2 font-semibold text-gray-700">Central</th>
                <th className="text-right px-4 py-2 font-semibold text-gray-700">High</th>
              </tr>
            </thead>
            <tbody>
              {pse.riskAdjustedConstruction.lots.map((lot, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="px-4 py-2 font-medium text-gray-700">{lot.name}</td>
                  <td className="px-4 py-2 text-right text-slate">{fmt(lot.base)}</td>
                  <td className="px-4 py-2 text-right text-green-700 font-semibold">{fmt(lot.low)}</td>
                  <td className="px-4 py-2 text-right text-navy font-bold">{fmt(lot.central)}</td>
                  <td className="px-4 py-2 text-right text-red-600 font-semibold">{fmt(lot.high)}</td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-bold border-t border-gray-300">
                <td className="px-4 py-2">Total Construction</td>
                <td className="px-4 py-2 text-right text-slate">{fmt(pse.riskAdjustedConstruction.total.base)}</td>
                <td className="px-4 py-2 text-right text-green-700">{fmt(pse.riskAdjustedConstruction.total.low)}</td>
                <td className="px-4 py-2 text-right text-navy">{fmt(pse.riskAdjustedConstruction.total.central)}</td>
                <td className="px-4 py-2 text-right text-red-600">{fmt(pse.riskAdjustedConstruction.total.high)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate bid ranges */}
      {[
        { title: 'Lot 1: Civil Works', candidates: pse.candidates.civil, bidKey: 'bids', perKey: 'perKm', perLabel: '$/km' },
        { title: 'Lot 2: Systems', candidates: pse.candidates.systems, bidKey: 'bids', perKey: 'perKm', perLabel: '$/km' },
        { title: 'Lot 3: Rolling Stock (~90 vehicles)', candidates: pse.candidates.rollingStock, bidKey: 'bids', perKey: 'perVehicle', perLabel: '$/vehicle' },
      ].map(lot => (
        <div key={lot.title} className="card overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="font-semibold text-navy text-sm">{lot.title} — Candidate Bid Ranges</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-4 py-2 font-semibold text-gray-700">Candidate</th>
                  <th className="text-right px-4 py-2 font-semibold text-gray-700">Low</th>
                  <th className="text-right px-4 py-2 font-semibold text-gray-700">Central</th>
                  <th className="text-right px-4 py-2 font-semibold text-gray-700">High</th>
                  <th className="text-right px-4 py-2 font-semibold text-gray-700">{lot.perLabel} (range)</th>
                  <th className="text-center px-4 py-2 font-semibold text-gray-700">Position</th>
                </tr>
              </thead>
              <tbody>
                {lot.candidates.map((c, i) => {
                  const b = c[lot.bidKey]
                  const per = b?.[lot.perKey]
                  return (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="px-4 py-2 font-medium text-gray-700">{c.name}</td>
                      <td className="px-4 py-2 text-right text-green-700 font-semibold">{fmt(b.low)}</td>
                      <td className="px-4 py-2 text-right text-navy font-bold">{fmt(b.central)}</td>
                      <td className="px-4 py-2 text-right text-red-600 font-semibold">{fmt(b.high)}</td>
                      <td className="px-4 py-2 text-right text-slate text-xs">
                        {per ? `$${per.low}M–$${per.high}M` : '—'}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <span className={`status-badge text-xs ${
                          c.position === 'Low' ? 'bg-green-100 text-green-800' :
                          c.position === 'Mid' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-600'
                        }`}>{c.position}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Lot 4: Operations */}
      <div className="card overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h3 className="font-semibold text-navy text-sm">Lot 4: Operations — Annual & 30-Year NPV</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 py-2 font-semibold text-gray-700">Operator</th>
                <th className="text-right px-4 py-2 font-semibold text-gray-700">Annual Low</th>
                <th className="text-right px-4 py-2 font-semibold text-gray-700">Annual Central</th>
                <th className="text-right px-4 py-2 font-semibold text-gray-700">Annual High</th>
                <th className="text-right px-4 py-2 font-semibold text-gray-700">30yr NPV (4%)</th>
                <th className="text-center px-4 py-2 font-semibold text-gray-700">Position</th>
              </tr>
            </thead>
            <tbody>
              {pse.candidates.operations.map((c, i) => {
                const b = c.bids
                return (
                  <tr key={i} className={`border-b border-gray-100 ${i === 0 ? 'bg-green-50' : ''}`}>
                    <td className="px-4 py-2 font-medium text-gray-700">
                      {c.name}
                      {i === 0 && <span className="ml-1 text-xs text-green-600">(Recommended)</span>}
                    </td>
                    <td className="px-4 py-2 text-right">${b.annualLow}M/yr</td>
                    <td className="px-4 py-2 text-right font-bold text-navy">${b.annualCentral}M/yr</td>
                    <td className="px-4 py-2 text-right">${b.annualHigh}M/yr</td>
                    <td className="px-4 py-2 text-right font-bold">{fmt(b.npv30yr)}</td>
                    <td className="px-4 py-2 text-center">
                      <span className={`status-badge text-xs ${
                        c.position === 'Low' ? 'bg-green-100 text-green-800' :
                        c.position === 'Mid' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-600'
                      }`}>{c.position}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key findings */}
      <div className="card p-5">
        <h3 className="font-semibold text-navy mb-3 text-sm">Key Financial Findings</h3>
        <ol className="space-y-2">
          {pse.keyFindings.map((f, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-700">
              <span className="font-bold text-navy shrink-0 w-4">{i + 1}.</span>
              <span className="leading-relaxed">{f}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Benchmarks */}
      <div className="card overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h3 className="font-semibold text-navy text-sm">Reference Benchmarks</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-4 py-2 font-semibold text-gray-700">Reference</th>
              <th className="text-right px-4 py-2 font-semibold text-gray-700">Cost</th>
              <th className="text-right px-4 py-2 font-semibold text-gray-700">Scale</th>
              <th className="text-right px-4 py-2 font-semibold text-gray-700">Unit Cost</th>
            </tr>
          </thead>
          <tbody>
            {pse.benchmarks.map((b, i) => (
              <tr key={i} className="border-b border-gray-100">
                <td className="px-4 py-2 font-medium text-gray-700">{b.reference}</td>
                <td className="px-4 py-2 text-right">{b.cost}</td>
                <td className="px-4 py-2 text-right text-slate">{b.scale}</td>
                <td className="px-4 py-2 text-right text-slate">{b.kmCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CPSPFinancial() {
  return (
    <div className="space-y-6">
      {/* Consolidated financial matrix */}
      <div className="card overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h3 className="font-semibold text-navy text-sm">Candidate Financial Comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 py-2 font-semibold text-gray-700">Candidate</th>
                <th className="text-right px-4 py-2 font-semibold text-gray-700">Acquisition (12)</th>
                <th className="text-right px-4 py-2 font-semibold text-gray-700">Per Hull</th>
                <th className="text-right px-4 py-2 font-semibold text-gray-700">Lifecycle (30yr)</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-700">IRB Status</th>
                <th className="text-right px-4 py-2 font-semibold text-gray-700">First Delivery</th>
              </tr>
            </thead>
            <tbody>
              {cpsp.candidates.map((c, i) => (
                <tr key={i} className={`border-b border-gray-100 ${i === 0 ? 'bg-blue-50' : ''}`}>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {c.name}
                    {i === 0 && <span className="ml-1 text-xs text-green-600">(Recommended)</span>}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold">{c.financial.acquisition12Hulls}</td>
                  <td className="px-4 py-2 text-right text-slate">{c.financial.perHullAcquisition}</td>
                  <td className="px-4 py-2 text-right font-semibold">{c.financial.lifecycle30yr}</td>
                  <td className="px-4 py-2 text-xs text-slate">{c.financial.bindingStatus}</td>
                  <td className="px-4 py-2 text-right">{c.financial.firstDelivery}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key financial finding */}
      <div className="card p-5 border-l-4 border-navy">
        <h3 className="font-semibold text-navy mb-2 text-sm">Key Financial Finding</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          TKMS's acquisition cost (~$12B) is higher-certainty than Hanwha's range ($11–15B) because TKMS has
          a Norway co-customer government-to-government reference price. Hanwha's lower range is possible but
          based on first-export pricing with no comparable reference — carries higher cost uncertainty.
          The split purchase is unambiguously the most expensive option (~$50–60B lifecycle vs. ~$44B TKMS).
        </p>
      </div>

      {/* IRB details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cpsp.candidates.map((c, i) => (
          <div key={i} className="card p-4 text-sm">
            <h4 className="font-bold text-navy mb-2">{c.name}</h4>
            <div className="space-y-1">
              <div><span className="text-slate font-medium">Acquisition:</span> {c.financial.acquisition12Hulls}</div>
              <div><span className="text-slate font-medium">Lifecycle:</span> {c.financial.lifecycle30yr}</div>
              <div><span className="text-slate font-medium">IRB:</span> {c.financial.irbCommitments}</div>
              <div>
                <span className="text-slate font-medium">Binding status: </span>
                <span className={`font-semibold ${c.financial.bindingStatus.toLowerCase().includes('binding') ? 'text-green-700' : 'text-amber-600'}`}>
                  {c.financial.bindingStatus}
                </span>
              </div>
              <div><span className="text-slate font-medium">First delivery:</span> {c.financial.firstDelivery}</div>
            </div>
          </div>
        ))}
      </div>

      {/* SSN strategic recommendation */}
      <div className="card p-5">
        <h3 className="font-semibold text-navy mb-3 text-sm">Strategic Recommendation: SSN Parallel Pathway</h3>
        <p className="text-sm text-gray-700 mb-3 leading-relaxed">{cpsp.strategicRecommendation.description}</p>
        <ol className="space-y-1">
          {cpsp.strategicRecommendation.actions.map((a, i) => (
            <li key={i} className="flex gap-2 text-sm text-gray-600">
              <span className="font-bold text-navy shrink-0">{i + 1}.</span>
              <span>{a}</span>
            </li>
          ))}
        </ol>
        <p className="text-sm text-slate mt-3 italic">{cpsp.strategicRecommendation.rationale}</p>
      </div>
    </div>
  )
}

export default function FinancialTab({ scenario }) {
  if (scenario.id === 'pse') return <PSEFinancial />
  if (scenario.id === 'cpsp') return <CPSPFinancial />

  return (
    <div className="card p-8 text-center">
      <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="text-gray-500 font-medium mb-1">Financial estimates pending full framework assessment</p>
      <p className="text-sm text-slate">Procurement has not advanced to financial analysis stage.</p>
    </div>
  )
}
