import React from 'react'

export default function SourcesTab({ scenario }) {
  const sources = scenario.sources || []

  if (sources.length === 0) {
    return (
      <div className="card p-8 text-center text-slate">
        No sources documented for this scenario.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="card p-5">
        <h3 className="font-semibold text-navy mb-4 text-sm">Source References</h3>
        <ol className="space-y-3">
          {sources.map((source, i) => (
            <li key={i} className="flex gap-3 text-sm border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              <span className="text-slate font-medium shrink-0 w-6">[{i + 1}]</span>
              <div>
                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy font-medium hover:text-gold transition-colors underline decoration-dotted"
                  >
                    {source.label}
                  </a>
                ) : (
                  <span className="text-gray-700">{source.label}</span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="text-xs text-slate px-1">
        <p>
          Sources reflect information available as of the document date (2026-05-15). URLs are provided only
          where the link is certain; otherwise sources are cited by organization and document title.
          This tool does not replace primary source verification for legal or policy purposes.
        </p>
      </div>
    </div>
  )
}
