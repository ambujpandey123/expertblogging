import PostCard from "./postCard";

export default async function PostListView() {
    let posts = []
    try {
        const request = await fetch("http://localhost:3000/api/posts", { cache: "no-cache" })
        const response = await request.json();
        // console.log(response.result);
        posts = response.result
    } catch (error) {
        console.log("Error Fetching posts List..", error);
    }

    if (!posts) {
        return <div>posts not available</div>
    }
    return (
        <>
            <section className="p-10">
                <div className="grid grid-cols-4 gap-5">

                    {posts.map((data, key) => {
                        return <PostCard data={data} key={key} />
                    })}

                </div>
            </section>
        </>
    )
}