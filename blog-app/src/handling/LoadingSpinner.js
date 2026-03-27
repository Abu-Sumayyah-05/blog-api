import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const LoadingSpinner = ({ message = 'Loading...', size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-16 h-16',
        lg: 'w-24 h-24',
    };
    return (_jsxs("div", { className: "flex flex-col items-center justify-center py-20 space-y-4", children: [_jsxs("div", { className: `relative ${sizeClasses[size]}`, children: [_jsx("div", { className: "absolute inset-0 border-4 border-blue-200 rounded-full" }), _jsx("div", { className: "absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin" })] }), message && (_jsx("p", { className: "text-slate-500 font-medium animate-pulse", children: message }))] }));
};
