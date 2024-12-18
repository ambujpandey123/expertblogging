import { Users, Layers2,FileText,UserPen } from "lucide-react";
//import CountCard from "./component/countCard";

export default async function Admin() {
    let count;
    try {
        const response = await fetch("http://localhost:3000/api/countTags", { cache: "no-cache" });
        const data = await response.json();
        count = data.count;

    } catch (error) {
        console.log("Error fetching the count:", error);
    }


    return (
        <main className="p-10">
            <div className="flex gap-4">
                {/* author card */}
                <div className="flex gap-2   light-orange px-8 py-3 items-center justify-center rounded-lg border">
                <UserPen />
                    <div>
                        <h1 className="font-bold text-center">Authors</h1>
                        <h1 className="font-bold text-xl text-center">{count?.authorCount}</h1>
                    </div>
                </div>
                {/* Categories card */}
                <div className="flex gap-2   light-orange px-8 py-3 items-center justify-center rounded-lg border">
                    <Layers2 />
                    <div>
                        <h1 className="font-bold text-center">Categories</h1>
                        <h1 className="font-bold text-xl text-center">{count?.categoriesCount}</h1>
                    </div>
                </div>
                {/* Post card */}
                <div className="flex gap-2   light-orange px-8 py-3 items-center justify-center rounded-lg border">
                <FileText />
                    <div>
                        <h1 className="font-bold text-center">Posts</h1>
                        <h1 className="font-bold text-xl text-center">{count?.postCount}</h1>
                    </div>
                </div>
                {/* User card */}
                <div className="flex gap-2   light-orange px-8 py-3 items-center justify-center rounded-lg border">
                <Users />
                    <div>
                        <h1 className="font-bold text-center">Users</h1>
                        <h1 className="font-bold text-xl text-center">{count?.userCount}</h1>
                    </div>
                </div>
            </div>
        </main>
    )
}       