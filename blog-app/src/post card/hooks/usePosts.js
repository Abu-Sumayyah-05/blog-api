import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchPosts, fetchPostById, PostsApiError } from '../../api/posts';
export const usePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loadingState, setLoadingState] = useState('idle');
    const [error, setError] = useState(null);
    const abortControllerRef = useRef(null);
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
        }
        catch (err) {
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
export const usePost = (id) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const abortControllerRef = useRef(null);
    const loadPost = useCallback(async () => {
        if (id === null)
            return;
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
        }
        catch (err) {
            if (err instanceof PostsApiError && err.message === 'Request was cancelled') {
                return;
            }
            const message = err instanceof Error ? err.message : 'Unknown error occurred';
            setError(message);
        }
        finally {
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
