import { LayoutDashboard,LayoutList,Layers2,User } from "lucide-react"
import Link from "next/link"

export default function SideBar() {
    const link = [
        {
            name: "Dashbord",
            link: "/admin",
            icon: <LayoutDashboard />
        },
        {
            name: "Posts",
            link: "/admin/posts",
            icon: <LayoutList />
        },
        {
            name: "Categories",
            link: "/admin/categories",
            icon: <Layers2 />
        },
        {
            name: "Authors",
            link: "/admin/authors",
            icon: <User />
        },
    ]
    return (
        <section className="w-[200px] border-r h-screen p-6">
           <ul className="w-full flex flex-col gap-6">
            {
                link.map((items)=>(
                    <Link href={items.link} key={items.name}>
                    <li className="flex gap-3 items-center font-bold light-orange rounded-full px-4 py-2">
                        {items.icon}
                        <span>{items.name}</span>
                    </li>
                    </Link>
                ))
            }
           </ul>
        </section>
    )
}