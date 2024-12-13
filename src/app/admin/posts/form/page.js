"use client";
// post form page 
import React from "react";
import { useState } from "react";
import { usePostform } from "./contexts/postFormContext";

export default function AuthorForm() {
    const [content, setContent] = useState("");
    const {
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
    } = usePostform();

    async function fetchCategoryData() {
        let categories = [];
        try {
            const response = await fetch("http://localhost:3000/api/uploadCategory", { cache: "no-cache" });
            const result = await response.json();
            categories = result.result;
        } catch (err) {
            console.error("Error fetching category list.", err);
        }
        return categories;
    }
    async function fetchAuthorsData() {
        let authors = [];
        try {
            const response = await fetch("http://localhost:3000/api/authors", { cache: "no-cache" });
            const result = await response.json();
            authors = result.result;
        } catch (err) {
            console.error("Error fetching authors list.", err);
        }
        return authors;
    }

    function CategoryField() {
        const [categories, setCategories] = React.useState([]);


        React.useEffect(() => {
            (async () => {
                const fetchedCategories = await fetchCategoryData();
                setCategories(fetchedCategories);
            })();
        }, []);

        return (
            <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600" htmlFor="category">
                    Category<span className="text-red-500">*</span>
                </label>
                <select
                    name="category"
                    id="category"
                    className="px-4 py-3 rounded-full border text-black border-[#ff5757b5]"
                    onChange={(e) => HandleData("category", e.target.value)}
                    value={data?.category || ""}
                    required
                >
                    <option value="" disabled>
                        Select a category
                    </option>
                    {categories && categories.map((item) => (
                        <option key={item._id} value={item.slug}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>

        );
    }
    function AuthorField() {
        const [authors, setAuthors] = React.useState([]);


        React.useEffect(() => {
            (async () => {
                const fetchedAuthors = await fetchAuthorsData();
                setAuthors(fetchedAuthors);
            })();
        }, []);

        return (
            <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600" htmlFor="category">
                    Authors<span className="text-red-500">*</span>
                </label>
                <select
                    name="author"
                    id="author"
                    className="px-4 py-3 rounded-full border text-black border-[#ff5757b5]"
                    onChange={(e) => HandleData("author", e.target.value)}
                    value={data?.author || ""}
                    required
                >
                    <option value="" disabled>
                        Select an Author
                    </option>
                    {authors && authors.map((item) => (
                        <option key={item._id} value={item.slug}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>

        );
    }

    return (
        <main className="w-full p-6 flex flex-col gap-3">
            <h1 className="font-bold">Post &gt; Form</h1>
            <section className="flex justify-center items-center gap-6">
                <form
                    className="flex flex-col gap-2 rounded-xl light-orange p-7"
                    onSubmit={(e) => {
                        e.preventDefault();
                        HandleCreate();
                    }}
                >
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-600" htmlFor="CategoryName">Title<span className="text-red-500">*</span></label>
                        <input
                            className="px-4 py-3 rounded-full border text-black border-[#ff5757b5]"
                            id="CategoryName"
                            placeholder="Enter Title"
                            onChange={(e) => HandleData("name", e.target.value)}
                            value={data?.name || ""}
                            required
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-600" htmlFor="CategorySlug">Post Bio<span className="text-red-500">*</span></label>
                        <input
                            className="px-4 py-3 rounded-full border text-black border-[#ff5757b5]"
                            id="CategorySlug"
                            placeholder="Enter Post Bio"
                            onChange={(e) => HandleData("slug", e.target.value)}
                            value={data?.slug || ""}
                            required
                            type="text"
                        />
                    </div>
                    <CategoryField />
                    <AuthorField />

                    {image && (
                        <div>
                            <img className="h-40" src={URL.createObjectURL(image)} alt="Selected Image" />
                        </div>
                    )}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-600" >Image<span className="text-red-500">*</span></label>
                        <input
                            className="px-4 py-3 rounded-full border bg-white border-[#ff5757b5]"
                            id="CategoryImage"
                            required
                            onChange={(e) => setImage(e.target.files[0])}
                            accept="image/*"
                            type="file"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-600" htmlFor="blogtext">Blog Text<span className="text-red-500">*</span></label>
                        <textarea
                            id="blogtext"
                            name="content"
                            rows="10"
                            style={{
                                resize: "both",
                                overflow: "auto",
                                width: "100%",
                                minHeight: "150px",
                                minWidth: "100%",
                                maxHeight: "400px",
                                maxWidth: "400px",

                            }}
                            className="px-4 py-3 rounded-lg border bg-white border-[#ff5757b5]"
                            placeholder="Enter Blog Data Here..."
                            value={blogtext}
                            onChange={e => setBlogText(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {!isDone && (
                        <button
                            type="submit"
                            disabled={isloading || isDone}
                            className="hard-orange rounded-full text-white p-3 mt-4"
                        >
                            {isloading ? "Loading..." : "Create"}
                        </button>
                    )}
                    {isDone && <h3 className="text-green-500 font-bold text-center">Successfully Created</h3>}
                </form>

            </section>
        </main>
    );
}
