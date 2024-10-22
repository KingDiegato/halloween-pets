import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  const data = await request.formData();
  const image = data.get("image");

  if (!image) {
    return NextResponse.json("Falta el archivo", { status: 400 });
  }
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const response = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          categorization: "aws_rek_tagging",
          auto_tagging: 0.6,
          upload_preset: "pet-hacka",
          folder: "pets",
        },
        (error, result) => {
          if (error) {
            console.log(error);
          }
          resolve(result);
        }
      )
      .end(buffer);
  });

  const tags = response.info.categorization.aws_rek_tagging.data.map(
    (tag) => tag.tag
  );

  if (!tags.includes("Cat") && !tags.includes("Dog")) {
    await cloudinary.uploader.destroy(response.public_id);
    return NextResponse.json(
      { error: "La imagen no contiene un gato o un perro" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    message: "Imagen subida!",
    url: response.secure_url,
  });
}
