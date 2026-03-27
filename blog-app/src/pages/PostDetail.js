import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { usePost } from '../post card/hooks/usePosts';
import { LoadingSpinner } from '../handling/LoadingSpinner';
const PostDetail = () => {
    const { id } = useParams();
    const postId = id ? parseInt(id, 10) : null;
    // Validate ID
    const isValidId = postId !== null && !isNaN(postId) && postId > 0;
    const { post, loading, error, refetch } = usePost(isValidId ? postId : null);
    // Calculate reading time
    const readingTime = useMemo(() => {
        if (!post?.body)
            return 0;
        const words = post.body.split(/\s+/).length;
        return Math.ceil(words / 200);
    }, [post?.body]);
    // Format date
    const publishDate = useMemo(() => {
        return new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }, []);
    // Invalid ID - redirect to 404
    if (!isValidId) {
        return _jsx(Navigate, { to: "/404", replace: true });
    }
    return (_jsxs("div", { className: "max-w-3xl mx-auto", children: [_jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors group", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors", children: _jsx("svg", { className: "w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 19l-7-7 7-7" }) }) }), _jsx("span", { className: "font-medium", children: "Back to all posts" })] }), loading && _jsx(LoadingSpinner, { message: "Loading post...", size: "md" }), !loading && error && (_jsxs("div", { className: "text-center py-16 bg-red-50 rounded-2xl border border-red-100", children: [_jsx("p", { className: "text-red-600 font-medium text-lg mb-4", children: error }), _jsx("button", { onClick: refetch, className: "px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors", children: "Try Again" })] })), !loading && !error && !post && (_jsxs("div", { className: "text-center py-16", children: [_jsx("h2", { className: "text-2xl font-bold text-slate-800 mb-2", children: "Post not found" }), _jsx("p", { className: "text-slate-500 mb-6", children: "This article may have been removed or doesn't exist." }), _jsx(Link, { to: "/", className: "px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-block", children: "Back to Home" })] })), !loading && !error && post && (_jsxs("article", { children: [_jsxs("div", { className: "bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden mb-8", children: [_jsx("div", { className: "h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600" }), _jsxs("div", { className: "p-8 md:p-12", children: [_jsxs("div", { className: "flex items-center gap-4 mb-6", children: [_jsx("span", { className: "px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold", children: "Featured Article" }), _jsxs("span", { className: "text-slate-400 text-sm", children: [readingTime, " min read"] })] }), _jsx("h1", { className: "text-3xl md:text-5xl font-black text-slate-900 mb-6", children: post.title }), _jsxs("div", { className: "flex items-center gap-4 pt-6 border-t border-slate-100", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold", children: post.title.charAt(0).toUpperCase() }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-slate-800", children: "Author Name" }), _jsxs("p", { className: "text-sm text-slate-500", children: ["Published on ", publishDate] })] })] })] })] }), _jsxs("div", { className: "bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/50", children: [_jsx("p", { className: "text-xl text-slate-700 leading-relaxed mb-8", children: post.body }), _jsx("div", { className: "pt-8 border-t border-slate-200", children: _jsx("div", { className: "flex flex-wrap gap-2", children: ['React', 'TypeScript', 'Web Dev', 'Tutorial'].map((tag) => (_jsxs("span", { className: "px-4 py-2 bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-lg text-sm font-medium transition-colors cursor-pointer", children: ["#", tag] }, tag))) }) })] })] }))] }));
};
export default PostDetail;
