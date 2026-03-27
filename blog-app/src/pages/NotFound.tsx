import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* 404 */}
      <div className="relative mb-8">
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-cyan-600 select-none">
          404
        </h1>
        <div className="absolute inset-0 text-9xl font-black text-blue-600/20 select-none transform translate-x-2 translate-y-2 -z-10">
          404
        </div>
      </div>

      {/* Message */}
      <h2 className="text-3xl font-bold text-slate-800 mb-4">Page Not Found</h2>
      <p className="text-lg text-slate-500 max-w-md mb-8 leading-relaxed">
        Oops! The page you are looking for seems to have vanished into the digital void.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Go Back Home
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        <button
          onClick={() => navigate(-1)}
          className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 hover:-translate-y-1"
        >
          Go Back
        </button>
      </div>

      {/* Bouncing Dots */}
      <div className="mt-16 flex gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    </div>
  );
};

export default NotFound;