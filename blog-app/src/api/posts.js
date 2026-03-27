const API_URL = 'https://jsonplaceholder.typicode.com/posts';
export class PostsApiError extends Error {
    status;
    originalError;
    constructor(message, status, originalError) {
        super(message);
        this.status = status;
        this.originalError = originalError;
        this.name = 'PostsApiError';
    }
}
export const fetchPosts = async (signal) => {
    try {
        const res = await fetch(API_URL, { signal });
        if (!res.ok) {
            throw new PostsApiError(`Failed to fetch posts: ${res.status} ${res.statusText}`, res.status);
        }
        const data = await res.json();
        // Runtime validation
        if (!Array.isArray(data)) {
            throw new PostsApiError('Invalid response format: expected array');
        }
        return data;
    }
    catch (error) {
        if (error instanceof PostsApiError)
            throw error;
        if (error instanceof Error && error.name === 'AbortError') {
            throw new PostsApiError('Request was cancelled');
        }
        throw new PostsApiError('Network error while fetching posts', undefined, error);
    }
};
export const fetchPostById = async (id, signal) => {
    const posts = await fetchPosts(signal);
    const post = posts.find((p) => p.id === id);
    if (!post) {
        throw new PostsApiError(`Post with ID ${id} not found`, 404);
    }
    return post;
};
