import PostCard from "@/app/component/postCard";

export default async function CategoryIdPage({ params }) {
  const { categoryId } = await params
  let post = []
  try {
    const request = await fetch("http://localhost:3000/api/posts", { cache: "no-cache" })
    const response = await request.json();
    //console.log(response.result);
    post = response.result
  } catch (error) {
    console.log("Error Fetching posts List..");
  }
  let filterpost = post.filter((item) => item.category === categoryId)
 // console.log(filterpost);

  return (
    <main className="p-10">
      <h1 className="text-3xl text-center font-bold light-orange p-4">{categoryId}</h1>
      <div className="grid grid-cols-5 gap-5">
        {filterpost.map((item, key) => {
          return <PostCard data={item} key={key} />
        })}
      </div>
    </main>
  )
}