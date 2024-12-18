export const createNewPost = async ({ data, image ,blogtext }) => {
    const { name, slug ,category ,author } = data;
    let bio = slug
    let title = name
    let email = localStorage.getItem("email");
    //console.log("uploading post email : ",email);
    let url="https://res.cloudinary.com/dxmfdypko/image/upload/v1732541964/bov18bxcjkznynuucrcg.png";
    let public_id="not-uploaded";
    
    if (!name) {
      throw new Error("Name is undefined.");
    }
    if (!bio) {
      throw new Error("Slug is undefined.");
    }
    if (!image) {
      throw new Error("Image is undefined.");
    }
  
    if (image.size > 1000000) {
      throw new Error("Select image size < 1 MB.");
    }
    if (!["image/jpeg", "image/png"].includes(image.type)) {
      throw new Error("Select jpg or png image.");
    }

    console.log("category is : ",category)
    console.log("author  is : ",author)
    console.log("blogtext is : ",blogtext)
  
    // const formData = new FormData();
    // formData.append("file", image);
    // formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);
  
  
    // try {
    //   const res = await fetch(
    //     `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
    //     {
    //       method: "POST",
    //       body: formData,
    //     }
    //   );
  
    //   const imgURL = await res.json();
  
  
    //   if (imgURL.secure_url) {
    //     // console.log("Image data:", imgURL);
    //     url = imgURL.secure_url;
    //     public_id = imgURL.public_id
    //     // console.log("Image id:", imgURL.public_id);
    //   } else {
    //     throw new Error("Failed to upload image. No URL returned.");
    //   }
    // } catch (error) {
    //   console.error("Image uploading error:", error);
    //   throw new Error("Image upload failed.");
    // }
  
    try {
      console.log("this line running....")
      const request = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title,email, bio,category,author,blogtext, url ,public_id}),
      });
  
      const response = await request.json();
     
      return response;  
    } catch (error) {
      
      throw new Error("Failed to create posts.");
    }
  };
  