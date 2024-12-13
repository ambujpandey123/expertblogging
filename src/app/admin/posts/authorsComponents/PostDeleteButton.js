"use client"

import { useRouter } from "next/navigation";

export default function PostDeleteButton(props) {
    const router = useRouter();
    let id = props.id
    async function DeletePost() {

        let ask = confirm("Do you Really Want To Delete")
        if (ask) {

            const request = await fetch("http://localhost:3000/api/posts", {
                method: "DELETE",
                body: JSON.stringify({ id })
            })
            let response = await request.json();
            console.log("the response is:", response);
            if (response.success) {
                alert("Post deleted")
                router.push("/admin/posts")
            }
            else {
                alert("some error occured When Dleting..")
            }
        }
    }

    return (
        <section>
            <button
                onClick={DeletePost}
                className="border border-black light-orange px-3 py-1 rounded-full text-sm">
                Delete
            </button>
        </section>
    )
}