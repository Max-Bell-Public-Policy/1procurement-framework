import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()

  return (
    <header className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <Link to="/" className="block">
              <h1 className="text-2xl font-bold tracking-tight leading-tight">
                Québec Procurement Analysis Framework
              </h1>
              <p className="mt-1 text-sm text-blue-200">
                A decision-support tool for senior government procurement officials
              </p>
            </Link>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              to="/"
              className={`font-medium transition-colors hover:text-gold ${
                location.pathname === '/' ? 'text-gold border-b border-gold pb-0.5' : 'text-blue-100'
              }`}
            >
              Scenarios
            </Link>
            <Link
              to="/framework"
              className={`font-medium transition-colors hover:text-gold ${
                location.pathname === '/framework' ? 'text-gold border-b border-gold pb-0.5' : 'text-blue-100'
              }`}
            >
              Framework Guide
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
