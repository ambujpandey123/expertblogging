import { CirclePlus } from "lucide-react";
import Link from "next/link";
import AuthorList from "./authorsComponents/authorList";


export default function Categories() {
    return (
        <main className="w-full p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center ">
                <h1 className="font-bold">Authors</h1>
                <Link href="/admin/authors/form">
                <button className="flex gap-2 items-center  px-4 py-2  hard-orange text-white rounded-full font-bold">
                    <CirclePlus />
                    Add
                </button>
                </Link>
            </div>
            <AuthorList/>
        </main>
    )
}
