import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('Procurement Framework render error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ fontFamily: 'sans-serif', maxWidth: 640, margin: '60px auto', padding: '0 24px' }}>
          <div style={{ background: '#1e3a5f', color: 'white', padding: '16px 24px', borderRadius: 4, marginBottom: 24 }}>
            <h1 style={{ margin: 0, fontSize: 18 }}>Québec Procurement Analysis Framework</h1>
          </div>
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 4, padding: 24 }}>
            <h2 style={{ color: '#991b1b', marginTop: 0 }}>Application Error</h2>
            <p style={{ color: '#374151' }}>
              The application encountered an error while rendering. Please try refreshing the page.
            </p>
            <pre style={{ background: '#f9fafb', padding: 12, borderRadius: 4, fontSize: 12, overflow: 'auto', color: '#6b7280' }}>
              {this.state.error?.message}
            </pre>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              style={{ background: '#1e3a5f', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }}
            >
              Try again
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
