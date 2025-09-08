import { create } from "zustand"
import type { UserStoreType } from "../types/user";

export const useUserStore = create<UserStoreType>((set) => ({
    loading: false,
    users: [],
    user: {},
    getAllUsers: async () => {
        set({ loading: true, users: [] });
        const res = await fetch(`https://jsonplaceholder.typicode.com/users`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const json = await res.json();
        set({ loading: false, users: json });
    },
    getSingleUser: async (id) => {
        set({ loading: true, user: {} });
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const json = await res.json();
        set({ loading: false, user: json });
    },
    deleteUser: async (id) => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        if(res.ok) {
            set((state) => ({
                users: state.users.filter((user) => user.id !== id)
            }));
        }
    },
    updateUser: async (user) => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        const json = await res.json();
        set({ user: json });
    }
}));