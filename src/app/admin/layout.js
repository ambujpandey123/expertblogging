"use client"
import AuthContextProvider, { useAuth } from "../lib/contexts/AuthContext";
import { useAdmin } from "../lib/firebase/admins/read";
import SideBar from "./component/sidebar";

export default function Layout({ children }) {
    return (
        <div>
            <AuthContextProvider>
                <InnerLayout>
                    {children}
                </InnerLayout>
            </AuthContextProvider>
        </div>

    )
}

function InnerLayout({ children }) {
    const { user, isLoading: authIsLoading } = useAuth();
    const { data, error, isLoading } = useAdmin({ uid: user?.uid })
    if (authIsLoading || isLoading) {
        return <h2>Loading...</h2>
    }
    if (error) {
        return <p>{error}</p>
    }
    if (!data) {
        return <div>
            <h1>You are not admin</h1>
        </div>
    }
    return (
        <section className="flex">
            <SideBar />
            {children}
        </section>
    )
}