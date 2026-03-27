import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from 'react';
export class ErrorBoundary extends Component {
    state = {
        hasError: false,
        error: null,
    };
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (this.props.fallback || (_jsxs("div", { className: "min-h-[60vh] flex flex-col items-center justify-center text-center px-4", children: [_jsx("h2", { className: "text-2xl font-bold text-slate-800 mb-4", children: "Something went wrong" }), _jsx("p", { className: "text-slate-500 mb-6", children: this.state.error?.message || 'An unexpected error occurred' }), _jsx("button", { onClick: () => window.location.reload(), className: "px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors", children: "Reload Page" })] })));
        }
        return this.props.children;
    }
}
