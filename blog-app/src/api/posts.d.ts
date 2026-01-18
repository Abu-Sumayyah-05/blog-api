export type Post = {
    id: number;
    title: string;
    body: string;
};
export declare const fetchPosts: () => Promise<Post[]>;
