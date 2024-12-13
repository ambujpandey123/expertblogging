"use client"

import { useRouter } from "next/navigation";

export default function AuthorDeleteButton(props) {
    const router = useRouter();
    let id = props.id
    async function DeleteAuthor() {
       let ask = confirm("Do you Really Want To Delete")
       if(!ask){
        return false
       }
        const request = await fetch("http://localhost:3000/api/authors", {
            method: "DELETE",
            body: JSON.stringify({ id })
        })
        let response = await request.json();
        console.log("the response is:", response);
        if (response.success) {
            alert("category deleted")
            router.push("/admin/categories")
        }
        else {
            alert("some error occured When Dleting..")
        }
    }

    return (
        <section>
            <button
                onClick={DeleteAuthor}
                className="border border-black light-orange px-3 py-1 rounded-full text-sm">
                Delete
            </button>
        </section>
    )
}