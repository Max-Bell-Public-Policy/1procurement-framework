import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-navy text-blue-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm">
            <p className="font-medium text-white">Québec Procurement Analysis Framework</p>
            <p className="mt-1 text-xs">
              Document date: 2026-05-15 &mdash; Prepared for senior government decision-makers, Québec
            </p>
          </div>
          <div className="text-sm">
            <Link
              to="/framework"
              className="text-gold hover:text-yellow-300 font-medium transition-colors"
            >
              Framework documentation →
            </Link>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-navy-800 border-opacity-50 text-xs text-blue-300">
          Scope: Public transit, infrastructure, defence materiel, digital systems, energy.
          This tool is for decision-support purposes and does not replace legal advice on trade agreement compliance.
        </div>
      </div>
    </footer>
  )
}
