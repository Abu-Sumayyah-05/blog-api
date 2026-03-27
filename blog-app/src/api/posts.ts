import { Post, ApiError } from '../page/types';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export class PostsApiError extends Error implements ApiError {
  constructor(
    message: string,
    public status?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'PostsApiError';
  }
}

export const fetchPosts = async (signal?: AbortSignal): Promise<Post[]> => {
  try {
    const res = await fetch(API_URL, { signal });
    
    if (!res.ok) {
      throw new PostsApiError(
        `Failed to fetch posts: ${res.status} ${res.statusText}`,
        res.status
      );
    }

    const data: unknown = await res.json();
    
    // Runtime validation
    if (!Array.isArray(data)) {
      throw new PostsApiError('Invalid response format: expected array');
    }

    return data as Post[];
  } catch (error) {
    if (error instanceof PostsApiError) throw error;
    
    if (error instanceof Error && error.name === 'AbortError') {
      throw new PostsApiError('Request was cancelled');
    }

    throw new PostsApiError(
      'Network error while fetching posts',
      undefined,
      error
    );
  }
};

export const fetchPostById = async (
  id: number,
  signal?: AbortSignal
): Promise<Post> => {
  const posts = await fetchPosts(signal);
  const post = posts.find((p) => p.id === id);
  
  if (!post) {
    throw new PostsApiError(`Post with ID ${id} not found`, 404);
  }
  
  return post;
};