import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { usePostStore } from "../../stores/post";
import Loader from "../Loader";
import { addToast, Button } from "@heroui/react";

export default function PostDetail() {

    const { id } = useParams();
    const postId = Number(id);

    const { loading, post, getSinglePost, updatePost } = usePostStore();

    useEffect(() => { getSinglePost(postId) }, [getSinglePost, postId]);

    const [ title, setTitle ] = useState(post?.title);
    const [ body, setBody ] = useState(post?.body);

    useEffect(() => {
        setTitle(post?.title);
        setBody(post?.body);
        // console.log(post);
    }, [post]);

    async function saveHandler() {
        await updatePost({ id: Number(id), title, body })
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
                    <div className="w-full text-center fadeInUp">
                        <h1 onInput={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.innerHTML)} className="text-3xl font-semibold outline-none mb-4" contentEditable suppressContentEditableWarning>{ post?.title }</h1>
                        <p onInput={(e: React.ChangeEvent<HTMLInputElement>) => setBody(e.target.innerHTML)} className="outline-none mb-6" contentEditable suppressContentEditableWarning>{ post?.body }</p>
                        <div className="">
                            <Button onPress={() => saveHandler()} color="primary" variant="flat" size="md">Save Post</Button>
                        </div>
                    </div>
                </>
            }
        </>
    )

}