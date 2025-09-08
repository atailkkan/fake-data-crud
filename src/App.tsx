import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./components/Home";
import About from "./components/About";
import UserList from "./components/User/List";
import PostList from "./components/Post/List";
import UserDetail from "./components/User/Detail";
import PostDetail from "./components/Post/Detail";
import { ToastProvider } from "@heroui/react";

export default function App() {
    return (
        <div className="max-w-[1000px] w-full m-auto p-6 !mb-12">
            <ToastProvider placement="top-right" />
            <BrowserRouter>
                <Menu />
                <div className="px-5">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/users" element={<UserList />} />
                        <Route path="/users/:id" element={<UserDetail />} />
                        <Route path="/posts" element={<PostList />} />
                        <Route path="/posts/:id" element={<PostDetail />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )

}
