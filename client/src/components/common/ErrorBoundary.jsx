import React from 'react';
import { AlertTriangle, RefreshCw, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-white">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-boutique-charcoal">
            Something unexpected occurred
          </h2>
          <p className="text-gray-500 text-xs mt-2 mb-6 max-w-sm">
            We encountered a temporary display issue loading this page. Please refresh or return to the shop.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={this.handleReload}
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-boutique-berry text-white text-xs font-bold uppercase tracking-wider hover:bg-boutique-deepRose transition-colors shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
              <span>Reload Page</span>
            </button>
            <a
              href="/products"
              className="inline-flex items-center px-5 py-2.5 rounded-full border border-gray-300 text-boutique-charcoal text-xs font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
              <span>Continue Shopping</span>
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
