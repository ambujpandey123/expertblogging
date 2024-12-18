"use client";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { Auth } from "../firebase";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dataSave, setDataSave] = useState(true);

    useEffect(() => {
        // Check if email exists in localStorage during initial load
        const localEmail = localStorage.getItem("email");
        if (localEmail) {
            console.log("Local storage is found");
            setDataSave(false);
        } else {
            console.log("Local storage is not found");
        }
    }, []); // Runs only on component mount

    // Function to upload user details to MongoDB
    async function uploadLoginDetailsToMongoDB(name, email, time, image) {
        try {
            localStorage.setItem("email", email);

            const response = await fetch("http://localhost:3000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, time, image }),
            });

            const result = await response.json();
            if (result.success) {
                console.log("Data successfully saved.");
                setDataSave(false);
            } else {
                console.error("Error saving data:", result.message);
                setError("Failed to save user data.");
            }
        } catch (err) {
            console.error("Error uploading data:", err);
            setError("An error occurred while saving user data.");
        }
    }

    useEffect(() => {
        setIsLoading(true);
        const unsub = onAuthStateChanged(Auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                if (dataSave) {
                    uploadLoginDetailsToMongoDB(
                        currentUser.displayName,
                        currentUser.email,
                        currentUser.metadata.creationTime,
                        currentUser.photoURL
                    );
                }
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });
        return () => unsub();
    }, [dataSave]);

    const handleSignInwithGoogle = async () => {
        setIsLoading(true);
        try {
            await signInWithPopup(Auth, new GoogleAuthProvider());
        } catch (err) {
            console.error("Sign-in error:", err);
            setError(err?.message ?? "An error occurred during sign-in.");
        }
        setIsLoading(false);
    };

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await signOut(Auth);
        } catch (err) {
            console.error("Logout error:", err);
            setError(err?.message ?? "An error occurred during logout.");
        }
        setIsLoading(false);
    };

    return (
        <AuthContext.Provider
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
    );
}

export const useAuth = () => useContext(AuthContext);
