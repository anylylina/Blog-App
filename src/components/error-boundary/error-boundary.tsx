import React from 'react'

type FallbackRenderArgs = {
  error: Error
  reset: () => void
}

type ErrorBoundaryProps = {
  children: React.ReactNode

  fallback?: React.ReactNode

  fallbackRender?: (args: FallbackRenderArgs) => React.ReactNode

  onError?: (error: Error, errorInfo: React.ErrorInfo) => void

  resetKeys?: unknown[]
}

type ErrorBoundaryState = {
  error: Error | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError?.(error, errorInfo)
  }

  componentDidUpdate() {
    const { resetKeys } = this.props
    if (!this.state.error) return

    if (resetKeys) {
      this.reset()
    }
  }

  reset = () => {
    this.setState({ error: null })
  }

  render() {
    const { children, fallback, fallbackRender } = this.props
    const { error } = this.state

    if (error) {
      if (fallbackRender) return fallbackRender({ error, reset: this.reset })
      if (fallback) return fallback
      return (
        <div role="alert" style={{ padding: 12 }}>
          <p style={{ fontWeight: 600, marginBottom: 8 }}>Что-то пошло не так.</p>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{error.message}</pre>
          <button onClick={this.reset} style={{ marginTop: 8 }}>
            Повторить
          </button>
        </div>
      )
    }

    return children
  }
}
