import Link from "next/link";

export default async function Categories() {
    let category = []
    try {
        const request = await fetch("http://localhost:3000/api/categories", { cache: "no-cache" })
        const response = await request.json();
        //console.log(response.result);
        category = response.result
    } catch (error) {
        console.log("Error Fetching Category List..");
    }

    function CategoryCard({ item }) {
        return <Link href={`/categories/${item?.slug}`}>
            <div className="flex flex-col border gap-2 m-4 p-2 items-center justify-center rounded-xl hover:bg-[#ff575724]" >
                <img className="h-[150px] w-[150px] object-cover rounded-full" src={item.url} alt="" />
                <h1 className="font-bold">{item?.name} </h1>
            </div>
        </Link>
    }

    return (
        <main className="p-10 ">
             <h1 className="text-3xl text-center font-bold light-orange p-4">Categories</h1>
            <section className="grid grid-cols-5">
                {category.map((item, key) => {
                    return <div key={key}>
                        <CategoryCard item={item} key={key} />
                    </div>
                })}
            </section>
        </main>
    )
}