import { useEffect } from "react";
import { useUserStore } from "../../stores/user"
import { NavLink } from "react-router-dom";
import Loader from "../Loader";
import { addToast } from "@heroui/react";

export default function UserList() {

    const { loading, users, getAllUsers, deleteUser } = useUserStore();

    useEffect(() => { getAllUsers() }, [getAllUsers]);

    async function deleteHandler(id: number) {
        await deleteUser(id)
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
                { users?.map((user, i) => (
                        <div key={i} className="relative col-span-1 border-2 border-zinc-200 text-center rounded-lg cursor-pointer duration-200 hover:border-zinc-400 fadeInUp">
                            <NavLink to={`/users/${user?.id}`} className="block p-4">
                                <h2 className="font-medium">{ user.name }</h2>
                                <h3 className="text-sm opacity-50">{ user.email }</h3>
                            </NavLink>
                            <div className="absolute z-10 -right-1 -top-1">
                                <span onClick={() => deleteHandler(Number(user?.id))} className="w-[24px] h-[24px] rounded-full flex items-center justify-center text-[70%] text-white bg-red-400 mb-0.5">
                                    <i className="ri-close-large-line"></i>
                                </span>
                            </div>
                        </div>
                    )) }
            </div>
        </>
    )

}