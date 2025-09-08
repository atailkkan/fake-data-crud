import { useEffect, useMemo, useState } from "react";
import { usePostStore } from "../../stores/post";
import { NavLink } from "react-router-dom";
import Loader from "../Loader";
import { addToast, Pagination } from "@heroui/react";

export default function PostList() {

    const { loading, posts, getAllPosts, deletePost } = usePostStore();

    useEffect(() => { getAllPosts() }, [getAllPosts]);

    const [ page, setPage ] = useState(1);
    const rowsPerPage = 9;
    const pages = Math.ceil(posts.length / rowsPerPage);
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return posts.slice(start, end);
    }, [page, posts]);

    async function deleteHandler(id: number) {
        await deletePost(id)
            .then(() => {
                addToast({
                    title: "Başarılı",
                    description: "Silme işleminiz başarılı",
                    color: "success",
                    radius: "md",
                    timeout: 3000,
                    shouldShowTimeoutProgress: true
                })
            });
    }

    return (
        <>
            <Loader loading={loading} />
            <div className="w-full grid gap-4 grid-cols-3">
                { items?.map((post, i) => (
                        <div key={i} className="relative col-span-1 border-2 border-zinc-200 text-center rounded-lg cursor-pointer duration-200 hover:border-zinc-400 fadeInUp">
                            <NavLink to={`/posts/${post.id}`} className="block p-4">
                                <h2 className="font-medium mb-4">{ post.title }</h2>
                                <h3 className="text-sm opacity-50">{ post.body }</h3>
                            </NavLink>
                            <div className="absolute z-10 -right-1 -top-1">
                                <span onClick={() => deleteHandler(Number(post?.id))} className="w-[24px] h-[24px] rounded-full flex items-center justify-center text-[70%] text-white bg-red-400">
                                    <i className="ri-close-large-line"></i>
                                </span>
                            </div>
                        </div>
                    )) }
            </div>
            {
                !loading && <Pagination showControls className="mt-4" classNames={{ wrapper: "m-auto", cursor: "bg-default-900 text-default-50" }} radius="sm" page={page} total={pages} onChange={(page) => setPage(page)} />
            }
        </>
    )

}