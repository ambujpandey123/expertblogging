import CategoryDeleteButton from "./CategoryDeleteButton";

export default async function CategoryList() {
    let data = []
    try {
        const request = await fetch("http://localhost:3000/api/categories",{cache:"no-cache"})
        const response = await request.json();
        //console.log(response.result);
        data = response.result
    } catch (error) {
        console.log("Error Fetching Category List..");
    }

    return (
        <section>
            <table className="w-full rounded-xl">
                <thead className="light-orange">
                    <tr>
                        <th className="border border-black px-4 py-2">Sr.</th>
                        <th className="border border-black px-4 py-2">Icon</th>
                        <th className="border border-black px-4 py-2">Name</th>
                        <th className="border border-black px-4 py-2">Slug</th>
                        <th className="border border-black px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {data?.map((item, key) => {
                        return <tr key={key}>
                            <td className="border border-black px-4 py-2">{key + 1}</td>
                            <td className=" border border-black px-4 py-2"> <img className="w-20 h-20 aspect-square" src={item?.url} alt="Icon" /></td>
                            <td className="border border-black px-4 py-2">{item?.name}</td>
                            <td className="border border-black px-4 py-2">{item?.slug}</td>
                            <td className="border border-black px-4 py-2"> <CategoryDeleteButton id={item._id}/> </td>
                        </tr>
                    })}

                </tbody>
            </table>
        </section>
    )
}
