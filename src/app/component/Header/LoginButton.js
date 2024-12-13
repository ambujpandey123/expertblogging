"use client"

import { useAuth } from "@/app/lib/contexts/AuthContext"
import Link from "next/link";
import { useState } from "react";

export default function LoginButton() {
 

    const {
        user,
        isloading,
        error,
        handleSignInwithGoogle,
        handleLogout,
    } = useAuth();
    if (isloading) {
        return <h1>Loding..</h1>
    }
 
    if (user) {
       
        return (
            <div className="flex gap-4 items-center">
                <button
                    className="flex items-center gap-3 hard-orange text-black px-4 py-2 rounded-full"
                    onClick={() => {
                        handleLogout();
                    }}
                >
                    Logout
                </button>
                <Link href={"/admin"}>
                    <div className="flex gap-4 rounded-xl px-3 py-2 light-orange"

                    >
                        <img className="object-cover h-12 w-12 rounded-full"
                            src={user?.photoURL} alt="User" />
                        <div>
                            <h1 className="font-bold">{user?.displayName}</h1>
                            <h1 className="text-sm text-gray-500">{user?.email}</h1>
                        </div>
                    </div>
                </Link>


            </div>
        )
    }

    function login() {
        handleSignInwithGoogle();

    }
    return (
        <section>
            <button className="flex items-center gap-3 bg-black  text-white px-4 py-2 rounded-full" onClick={login}>
                <img className="h-7  " src="/google.png" alt="google" />
                Login With Google
            </button>
        </section>
    )
}
