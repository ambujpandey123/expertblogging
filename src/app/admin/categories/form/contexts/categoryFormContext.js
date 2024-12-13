"use client"

import { createNewCategory } from "@/app/lib/firebase/category/write";
import { createContext, useContext, useState } from "react";
const categoryFormContext = createContext();
export default function CategoryFormContentProvider({ children }) {
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
            await createNewCategory({ data: data, image: image })
            setIsDone(true)
        } catch (error) {
            setError(error?.message)
        }
        setLoding(false)
    }

    return (
        <categoryFormContext.Provider
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
        </categoryFormContext.Provider>
    )
}

export const useCategoryform = () => useContext(categoryFormContext)