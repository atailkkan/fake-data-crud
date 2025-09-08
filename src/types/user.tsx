export interface UserStoreType {
    loading: boolean,
    users: User[],
    user: User,
    getAllUsers: () => Promise<void>,
    getSingleUser: (id: number) => Promise<void>,
    deleteUser: (id: number) => Promise<void>,
    updateUser: (user: User) => Promise<void>
}

export interface User {
    id?: number,
    name?: string,
    username?: string,
    email?: string
}
