import React, { useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { usePost } from '../post card/hooks/usePosts';
import { LoadingSpinner } from '../handling/LoadingSpinner';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postId = id ? parseInt(id, 10) : null;
  
  // Validate ID
  const isValidId = postId !== null && !isNaN(postId) && postId > 0;
  
  const { post, loading, error, refetch } = usePost(isValidId ? postId : null);

  // Calculate reading time
  const readingTime = useMemo(() => {
    if (!post?.body) return 0;
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
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back Navigation */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors group"
      >
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
          <svg
            className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        <span className="font-medium">Back to all posts</span>
      </Link>

      {/* Loading */}
      {loading && <LoadingSpinner message="Loading post..." size="md" />}

      {/* Error */}
      {!loading && error && (
        <div className="text-center py-16 bg-red-50 rounded-2xl border border-red-100">
          <p className="text-red-600 font-medium text-lg mb-4">{error}</p>
          <button
            onClick={refetch}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Not Found */}
      {!loading && !error && !post && (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Post not found
          </h2>
          <p className="text-slate-500 mb-6">
            This article may have been removed or doesn't exist.
          </p>
          <Link
            to="/"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-block"
          >
            Back to Home
          </Link>
        </div>
      )}

      {/* Post Content */}
      {!loading && !error && post && (
        <article>
          {/* Header Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden mb-8">
            <div className="h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600" />
            
            <div className="p-8 md:p-12">
              {/* Meta */}
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  Featured Article
                </span>
                <span className="text-slate-400 text-sm">
                  {readingTime} min read
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
                {post.title}
              </h1>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">
                  {post.title.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Author Name</p>
                  <p className="text-sm text-slate-500">
                    Published on {publishDate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/50">
            <p className="text-xl text-slate-700 leading-relaxed mb-8">
              {post.body}
            </p>

            {/* Tags */}
            <div className="pt-8 border-t border-slate-200">
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Web Dev', 'Tutorial'].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>
      )}
    </div>
  );
};

export default PostDetail;