import Link from "next/link";

export default function PostCard({ data }) {
    const date = new Date(data?.updatedAt);
    const formattedDate = date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
    
    return <Link href={"/post/"+data._id}>
    <div >
        <div className="flex flex-col gap-3 p-5 rounded-lg border ">
            <div className="relative">
                <div className="absolute flex justify-end w-full p-2 "><span className="pl-2 pr-2 rounded-lg bg-white bg-opacity-75">{data.category}</span></div>
                <img className="h-[200px] w-full object-cover" src={data.url} alt="blogimage" />    
            </div>
            <h1>{data?.title || data?.name}</h1>
            <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                    <img className="h-6 w-6 rounded-full object-cover " src="./defaultdp.jpg"  alt="author" />
                    <h4 className="text-sm text-gray-700">@{data.author} </h4>
                </div>
                <h5 className="text-xs text-gray-500">{formattedDate}</h5>
            </div>
        </div>
    </div></Link>
}