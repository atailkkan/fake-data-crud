import { create } from "zustand"
import type { PostStoreType } from "../types/post";

export const usePostStore = create<PostStoreType>((set) => ({
    loading: false,
    posts: [],
    post: {},
    getAllPosts: async () => {
        set({ loading: true, posts: [] });
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const json = await res.json();
        set({ loading: false, posts: json });
    },
    getSinglePost: async (id) => {
        set({ loading: true, post: {} });
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const json = await res.json();
        set({ loading: false, post: json });
    },
    getUserPosts: async (id) => {
        set({ loading: true, posts: [] });
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const json = await res.json();
        set({ loading: false, posts: json });
    },
    deletePost: async (id) => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        if(res.ok) {
            set((state) => ({
                posts: state.posts.filter((post) => post.id !== id)
            }));
        }
    },
    updatePost: async (post) => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post)
        });
        const json = await res.json();
        set({ post: json });
    }
}));