import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScenarioGrid from './components/ScenarioGrid'
import ScenarioDetail from './components/ScenarioDetail'
import FrameworkGuide from './components/FrameworkGuide'

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<ScenarioGrid />} />
            <Route path="/scenario/:id" element={<ScenarioDetail />} />
            <Route path="/framework" element={<FrameworkGuide />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
