import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console for debugging
    console.error('Mirage Studio Error Boundary caught an error:', error, errorInfo);
    
    // In production, you would send this to an error tracking service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white p-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <div className="text-6xl mb-4">🚨</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">Framework Exception</h1>
              <p className="text-gray-600 mb-6">
                Our AI collaboration framework encountered an unexpected condition. 
                The technical team has been notified and is investigating.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
              <div className="text-sm font-medium text-gray-700 mb-2">Technical Details:</div>
              <div className="text-xs text-gray-500 font-mono overflow-auto max-h-32">
                {this.state.error?.toString() || 'Unknown error'}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleRetry}
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Reinitialize Framework
              </button>
              <button
                onClick={() => window.history.back()}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Return to Safety
              </button>
            </div>
            
            <div className="mt-8 text-xs text-gray-400">
              <p>Error ID: {Date.now().toString(36)}</p>
              <p className="mt-1">Mirage Studio Quality Assurance Team has been alerted</p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;