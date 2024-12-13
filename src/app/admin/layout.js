import AuthContextProvider from "../lib/contexts/AuthContext";
import SideBar from "./component/sidebar";

export default function Layout({ children }) {
    return (
        <>
            <AuthContextProvider>
                <section className="flex">
                    <SideBar />
                    {children}
                </section>
            </AuthContextProvider>
        </>
    )
}