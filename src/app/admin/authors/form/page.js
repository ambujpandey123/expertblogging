"use client"

import { useAuthorform } from "./contexts/authorFormContext";


export default function authorForm() { 
    const {
        data ,
        image,
        setImage,
        isloading,
        error,
        isDone,
        HandleData,
        HandleCreate,
    } = useAuthorform();
    
   
    
    return (
        <main className="w-full p-6 flex flex-col gap-3">
            <h1 className="font-bold">Authors &gt; Form</h1>
            <section className="flex justify-center items-center">
                <form className="flex flex-col gap-2 rounded-xl light-orange p-7"
                onSubmit={(e)=>{e.preventDefault()
                    HandleCreate();
                }}
                >
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-600" htmlFor="CategoryName">Author Name <span className="text-red-500">*</span></label>
                        <input className="px-4 py-3 rounded-full border text-black  border-[#ff5757b5]"
                            id="CategoryName"
                            placeholder="Enter Author Name"
                            onChange={(e) => { 
                                HandleData('name',e.target.value)
                                
                            }}
                            value={data?.name}
                            required
                            type="text" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-600" htmlFor="CategorySlug">Author Bio <span className="text-red-500">*</span></label>
                        <input className="px-4 py-3 rounded-full border text-black  border-[#ff5757b5]"
                            id="CategorySlug"
                            placeholder="Enter Author Bio"
                            onChange={(e) => {
                                HandleData('slug',e.target.value)
                            }}
                            value={data?.slug}
                            required
                            type="text" />
                    </div>
                    { image && <div>
                        <img className="h-40" src={URL.createObjectURL(image)} alt="Selected Image" />
                    </div>}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-600" htmlFor="CategoryImage">Image<span className="text-red-500">*</span></label>
                        <input className="px-4 py-3 rounded-full border  bg-white border-[#ff5757b5]"
                            id="CategoryImage"
                            
                            required
                            onChange={(e) => {
                               e.preventDefault();
                               setImage(e.target.files[0])
                            }}
                            accept="image/*"
                            type="file" />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                   {!isDone && <button
                    type="submit"
                    disabled={isloading || isDone}
                    className="hard-orange rounded-full text-white p-3">
                  {isloading ? "Loading.." : " Create"}
                        
                    </button>}
                    {isDone && <h3 className="text-green-500 font-bold text-center">Successfully Created</h3>}
                </form>
            </section>
        </main>
    )
}