import { NavLink } from "react-router-dom";

export default function Menu() {
    return (
        <div className="flex items-center justify-between bg-zinc-100 rounded-full text-sm p-2 mb-6">
            <div className="font-bold cursor-pointer p-1 px-3">
                <NavLink to="/">
                    <span>LOGO</span>
                </NavLink>
            </div>
            <ul className="flex">
                <li className="cursor-pointer duration-200 hover:bg-zinc-200 rounded-full p-1 px-3">
                    <NavLink to="/">
                        <span>Home</span>
                    </NavLink>
                </li>
                <li className="cursor-pointer duration-200 hover:bg-zinc-200 rounded-full p-1 px-3">
                    <NavLink to="/about">
                        <span>About</span>
                    </NavLink>
                </li>
                <li className="cursor-pointer duration-200 hover:bg-zinc-200 rounded-full p-1 px-3">
                    <NavLink to="/users">
                        <span>Users</span>
                    </NavLink>
                </li>
                <li className="cursor-pointer duration-200 hover:bg-zinc-200 rounded-full p-1 px-3">
                    <NavLink to="posts">
                        <span>Posts</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}