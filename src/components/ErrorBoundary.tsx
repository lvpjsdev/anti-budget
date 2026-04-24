// Error Boundary component for catching React errors
import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="min-h-screen bg-tg-bg flex items-center justify-center p-4">
          <div className="bg-tg-secondary rounded-xl p-6 max-w-md text-center">
            <h2 className="text-2xl font-bold text-tg-text mb-4">Something went wrong</h2>
            <p className="text-tg-hint mb-4">
              The app encountered an error. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-xl bg-tg-button text-tg-button-text font-semibold"
            >
              Refresh
            </button>
            <pre className="mt-4 text-xs text-tg-hint text-left overflow-auto">
              {this.state.error?.message}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
