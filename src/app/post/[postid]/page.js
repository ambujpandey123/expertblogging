export default async function Page({ params }) {
    const { postid } = await params
    let post
    try {
        const request = await fetch("http://localhost:3000/api/posts/" + postid, { cache: "no-cache" })
        const response = await request.json();
        // console.log(response.result);
        post = response.result
    } catch (error) {
        console.log("Error Fetching posts List..", error);
    }
    //console.log(post);
    const date = new Date(post?.updatedAt);
    const formattedDate = date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return <main className=" flex justify-center">
         <section className="flex flex-col px-16 py-10 max-w-[800px]">
         <div className=" ">
                <div className="  w-full p-2 "><span className="pl-2 pr-2 rounded-lg bg-white bg-opacity-60 border">{post?.category}</span></div>
                
            </div>
        <h1 className="text-2xl font-bold">{post?.name || post?.title} </h1>
        <img className="w-full   " src={post?.url} alt="postimg" />
        <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                    <img className="h-6 w-6 rounded-full object-cover " src="../defaultdp.jpg" alt="author" />
                    <h4 className="text-sm text-gray-700">@{post?.author} </h4>
                </div>
                <h5 className="text-xs text-gray-500">{formattedDate}</h5>
            </div>
            <div>{post?.blogtext} </div>
         </section>
    </main>
}