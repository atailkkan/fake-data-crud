import { Spinner } from "@heroui/react";

export default function Loader({ loading }: { loading: boolean }) {
    return (
        loading && <div className="w-full text-center">
            <Spinner color="default" />
            <span className="block">Loading</span>
        </div>
    )
}