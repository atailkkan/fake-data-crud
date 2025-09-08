import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom"
import { useUserStore } from "../../stores/user";
import { usePostStore } from "../../stores/post";
import Loader from "../Loader";
import { addToast, Button } from "@heroui/react";

export default function UserDetail() {

    const { id } = useParams();
    const userId = Number(id);
    
    const { user, getSingleUser, updateUser } = useUserStore();
    const { loading, posts, getUserPosts, deletePost } = usePostStore();

    useEffect(() => { getSingleUser(userId) }, [getSingleUser, userId]);
    useEffect(() => { getUserPosts(userId) }, [getUserPosts, userId, user]);

    const [ username, setUsername ] = useState(user?.username);
    const [ name, setName ] = useState(user?.name);
    const [ email, setEmail ] = useState(user?.email);

    useEffect(() => {
        setUsername(user?.username);
        setName(user?.name);
        setEmail(user?.email);
        // console.log(post);
    }, [user]);
    
    async function deleteHandler(id: number) {
        await deletePost(id);
    }

    async function saveHandler() {
        await updateUser({ id: Number(id), username, name, email })
            .then(() => {
                addToast({
                    title: "Başarılı",
                    description: "Güncelleme işleminiz başarılı",
                    color: "success",
                    radius: "md",
                    timeout: 3000,
                    shouldShowTimeoutProgress: true
                });
            });
    }

    return (
        <>
            <Loader loading={loading} />
            {
                !loading && <>
                    <div className="fadeInUp">
                        <div className="mb-6">
                            <div className="w-[90px] h-[90px] bg-zinc-100 rounded-full m-auto flex items-center justify-center text-4xl text-zinc-400 font-medium !mb-2">
                                <i className="ri-user-line"></i>
                            </div>
                            <div className="text-center">
                                <small onInput={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.innerHTML)} className="inline-block bg-zinc-100 p-1 px-3 rounded-full outline-none mb-2" contentEditable suppressContentEditableWarning>@{ user?.username }</small>
                                <h2 onInput={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.innerHTML)} className="text-2xl font-semibold outline-none" contentEditable suppressContentEditableWarning>{ user?.name }</h2>
                                <h3 onInput={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.innerHTML)} className="outline-none mb-2" contentEditable suppressContentEditableWarning>{ user?.email }</h3>
                                <Button onPress={() => saveHandler()} color="primary" variant="flat" size="sm">Edit User</Button>
                            </div>
                        </div>
                        <div className="w-full grid gap-4 grid-cols-3">
                            {
                                posts.map((post, i) => (
                                    <div key={i} className="relative col-span-1 border-2 border-zinc-200 text-center rounded-lg cursor-pointer duration-200 hover:border-zinc-400">
                                        <NavLink to={`/posts/${post?.id}`} className="block p-4">
                                            <h2 className="font-medium mb-4">{ post?.title }</h2>
                                            <h3 className="text-sm opacity-50">{ post?.body }</h3>
                                        </NavLink>
                                        <div className="absolute z-10 -right-1 -top-1">
                                            <span onClick={() => deleteHandler(Number(post?.id))} className="w-[24px] h-[24px] rounded-full flex items-center justify-center text-[70%] text-white bg-red-400">
                                                <i className="ri-close-large-line"></i>
                                            </span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </>
            }
        </>
    )

}