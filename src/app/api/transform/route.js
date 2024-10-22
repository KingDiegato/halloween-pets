import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request, params) {
  const body = await request.json();
  const { message, folder, public_id, url } = body;

  const image_url = cloudinary.url(public_id, {
    transformation: [
      { overlay: "masks:pumpkin:pumpkin2" },
      { flags: "region_relative", width: "1.0", crop: "scale" },
      { flags: "layer_apply", gravity: "faces" },
    ],
  });

  return NextResponse.json({ image: image_url });
}
