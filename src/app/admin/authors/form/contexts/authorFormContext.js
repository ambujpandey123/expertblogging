"use client"

 
import { createNewAuthor } from "@/app/lib/firebase/author/write";
import { createContext, useContext, useState } from "react";
const AuthorFormContext = createContext();
export default function AuthorFormContentProvider({ children }) {
    const [data, setdata] = useState({ name: "", slug: "" });
    const [image, setImage] = useState(null);
    const [isloading, setLoding] = useState(false);
    const [error, setError] = useState(null);
    const [isDone, setIsDone] = useState(false);

    const HandleData = (key, value) => {
        setIsDone(false)
        setdata({
            ...data,
            [key]: value,
        })
    }

    const HandleCreate = async () => {
        setIsDone(false)
        setError(null)
        setLoding(true)
        try {
            await createNewAuthor({ data: data, image: image })
            setIsDone(true)
        } catch (error) {
            setError(error?.message)
        }
        setLoding(false)
    }

    return (
        <AuthorFormContext.Provider
            value={{
                data,
                image,
                setImage,
                isloading,
                error,
                isDone,
                HandleData,
                HandleCreate,
            }}
        >
            {children}
        </AuthorFormContext.Provider>
    )
}

export const useAuthorform = () => useContext(AuthorFormContext)