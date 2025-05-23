export const createNewAuthor = async ({ data, image }) => {
    const { name, slug } = data;
    const bio = slug;
    let email = localStorage.getItem("email");
    if (!name) {
      throw new Error("Name is undefined.");
    }
    if (!bio) {
      throw new Error("Bio is undefined.");
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
  
    console.log("data in write",image,name , slug);
     
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);
  
    let url="https://res.cloudinary.com/dxmfdypko/image/upload/v1732541964/bov18bxcjkznynuucrcg.png";
    let public_id;
  
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      const imgURL = await res.json();
  
  
      if (imgURL.secure_url) {
        // console.log("Image data:", imgURL);
        url = imgURL.secure_url;
        public_id = imgURL.public_id
        // console.log("Image id:", imgURL.public_id);
      } else {
        throw new Error("Failed to upload image. No URL returned.");
      }
    } catch (error) {
      console.error("Image uploading error:", error);
      throw new Error("Image upload failed.");
    }
    try {
      const request = await fetch("/api/authors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name,email, bio, url ,public_id}),
      });
  
      const response = await request.json();
     
      return response;  
    } catch (error) {
      
      throw new Error("Failed to create Author.");
    }
  };
  