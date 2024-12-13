import { Home, List, MessageCircle } from "lucide-react";
import LoginButton from "./LoginButton";
import AuthContextProvider from "@/app/lib/contexts/AuthContext";
import Link from "next/link";

export default function Header() {
    return (
        <nav className="flex justify-between items-center px-7 py-3 border-b ">
            <Link href="/">
                <img className="h-10" src="/logo.png" alt="expertBlog" />
            </Link>
            <ul className="flex gap-6 items-center">
                <li className="flex items-center gap-2">
                    <Home />
                    Home
                </li>
                <li className="flex items-center gap-2">
                    <List />
                    Blogs
                </li>
                <li className="flex items-center gap-2">
                    <MessageCircle />
                    Contect Us
                </li>
            </ul>
            <AuthContextProvider>
                <LoginButton />
            </AuthContextProvider>
        </nav>
    )
}