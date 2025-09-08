export interface PostStoreType {
    loading: boolean,
    posts: Post[],
    post: Post,
    getAllPosts: () => Promise<void>,
    getSinglePost: (id: number) => Promise<void>,
    getUserPosts: (id: number) => Promise<void>,
    deletePost: (id: number) => Promise<void>,
    updatePost: (post: Post) => Promise<void>
}

export interface Post {
    userId?: number,
    id?: number,
    title?: string,
    body?: string
}