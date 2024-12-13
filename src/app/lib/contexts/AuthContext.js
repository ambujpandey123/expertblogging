"use client"
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { Auth } from "../firebase";

const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)
    const [dataSave, setDataSave] = useState(true)
    let localemail = localStorage.getItem("email")
    if (localemail){
        setDataSave(false)
    }
    async function uploadLoginDetailsToMongoDB(name, email, time, image) {
        
        localStorage.setItem("email", email)

        const request = await fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, time, image })
        })
        let response = await request.json();
        if (response.success) {
            console.log("data Successfully Saved..");
            setDataSave(false)
        }
    }
    useEffect(() => {
        setIsLoading(true)
        const unsub = onAuthStateChanged(Auth, (user) => {
            if (user) {
                setUser(user)
                if (dataSave) {
                    uploadLoginDetailsToMongoDB(user.displayName, user.email, user.metadata.creationTime, user.photoURL)
                }
            }
            else {
                setUser(null)
            }
            setIsLoading(false)
        })
        return () => unsub();
    }, [])

    const handleSignInwithGoogle = async () => {
        setIsLoading(true)
        try {
            await signInWithPopup(Auth, new GoogleAuthProvider())
        } catch (error) {
            setError(error?.message ?? "Some error Occured")
        }
        setIsLoading(false)
    }
    const handleLogout = async () => {
        setIsLoading(true)
        try {
            await signOut(Auth)
        } catch (error) {
            setError(error?.message ?? "Some error Occured")
        }
        setIsLoading(false)
    }


    return <AuthContext.Provider
        value={{
            user,
            isloading,
            error,
            handleSignInwithGoogle,
            handleLogout,

        }}
    >
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)