import React from 'react';
import { usePosts } from '../post card/hooks/usePosts';
import { PostCard } from '../components/PostCard';
import { LoadingSpinner } from '../handling/LoadingSpinner';

const Home: React.FC = () => {
  const { posts, loading, error, refetch } = usePosts();

  return (
    <div>
      {/* Header */}
      <div className="mb-12 text-center relative">
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-600 mb-4 tracking-tight">
          Latest Stories
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Discover insights, tutorials, and thoughts on modern web development
        </p>
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl" />
      </div>

      {/* Loading */}
      {loading && <LoadingSpinner message="Loading amazing content..." />}

      {/* Error */}
      {error && (
        <div className="max-w-md mx-auto text-center py-16">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-red-500 mb-6">{error}</p>
          <button
            onClick={refetch}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Posts Grid */}
      {!loading && !error && posts.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && posts.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-xl font-bold text-slate-800">No posts yet</h3>
          <p className="text-slate-500">Check back later for new content!</p>
        </div>
      )}
    </div>
  );
};

export default Home;