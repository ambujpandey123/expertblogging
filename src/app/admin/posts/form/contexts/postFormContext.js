"use client"

import { createNewPost } from "@/app/lib/firebase/post/write";
import { createContext, useContext, useState } from "react";
const PostFormContext = createContext();
export default function PostFormContentProvider({ children }) {
    const [data, setdata] = useState({ name: "", slug: "" ,category:"" ,author: ""});
    const [blogtext, setBlogText] = useState("");
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
            await createNewPost({ data: data, image: image, blogtext : blogtext})
            setIsDone(true)
        } catch (error) {
            setError(error?.message)
        }
        setLoding(false)
    }

    return (
        <PostFormContext.Provider
            value={{
                data,
                image,
                setImage,
                isloading,
                blogtext,
                setBlogText,
                error,
                isDone,
                HandleData,
                HandleCreate,
            }}
        >
            {children}
        </PostFormContext.Provider>
    )
}

export const usePostform = () => useContext(PostFormContext)