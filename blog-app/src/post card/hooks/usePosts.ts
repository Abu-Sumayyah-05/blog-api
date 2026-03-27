import { useState, useEffect, useCallback, useRef } from 'react';
import { Post, LoadingState } from '../../page/types';
import { fetchPosts, fetchPostById, PostsApiError } from '../../api/posts';

interface UsePostsReturn {
  posts: Post[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const usePosts = (): UsePostsReturn => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadPosts = useCallback(async () => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoadingState('loading');
    setError(null);

    try {
      const data = await fetchPosts(controller.signal);
      setPosts(data);
      setLoadingState('success');
    } catch (err) {
      if (err instanceof PostsApiError && err.message === 'Request was cancelled') {
        return; // Don't update state if cancelled
      }
      
      const message = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(message);
      setLoadingState('error');
    }
  }, []);

  useEffect(() => {
    loadPosts();
    
    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadPosts]);

  return {
    posts,
    loading: loadingState === 'loading',
    error,
    refetch: loadPosts,
  };
};

interface UsePostReturn {
  post: Post | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const usePost = (id: number | null): UsePostReturn => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadPost = useCallback(async () => {
    if (id === null) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchPostById(id, controller.signal);
      setPost(data);
    } catch (err) {
      if (err instanceof PostsApiError && err.message === 'Request was cancelled') {
        return;
      }
      
      const message = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadPost();
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadPost]);

  return {
    post,
    loading,
    error,
    refetch: loadPost,
  };
};