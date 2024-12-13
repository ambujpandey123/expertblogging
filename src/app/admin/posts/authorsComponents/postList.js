import PostDeleteButton from "./PostDeleteButton";

export default async function PostList() {
    let data = []
    try {
        const request = await fetch("http://localhost:3000/api/posts",{cache:"no-cache"})
        const response = await request.json();
       // console.log(response.result);
        data = response.result
    } catch (error) {
        console.log("Error Fetching Authors List..",error);
    }
   // console.log(data);
    
    return (
        <section>
            <table className="w-full rounded-xl">
                <thead className="light-orange">
                    <tr>
                        <th className="border border-black px-4 py-2">Sr.</th>
                        <th className="border border-black px-4 py-2">Image</th>
                        <th className="border border-black px-4 py-2">Name</th>
                        <th className="border border-black px-4 py-2">Bio</th>
                        <th className="border border-black px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {data?.map((item, key) => {
                        return <tr key={key}>
                            <td className="border border-black px-4 py-2">{key + 1}</td>
                            <td className=" border border-black px-4 py-2"> <img className="w-20 h-20 aspect-square" src={item?.url} alt="Icon" /></td>
                            <td className="border border-black px-4 py-2">{item?.name}</td>
                            <td className="border border-black px-4 py-2">{item?.bio}</td>
                            <td className="border border-black px-4 py-2"> <PostDeleteButton id={item._id}>Delete</PostDeleteButton> </td>
                        </tr>
                    })}

                </tbody>
            </table>
        </section>
    )
}

