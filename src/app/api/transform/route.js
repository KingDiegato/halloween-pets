import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function randomNumber() {
  return Math.floor(Math.random() * 5) + 1;
}
export async function POST(request, params) {
  const body = await request.json();
  const { message, folder, public_id, height, width, url, selectedMask } = body;
  const number = randomNumber();

  const maskType = {
    assassin: `masks:insulin:insulin${number}`,
    clown: `masks:clown:clown${number}`,
    ghost: `masks:ghost:ghost${number}`,
    pumpkin: `masks:pumpkin:pumpkin${number}`,
    skull: `masks:skull:skull${number}`,
    witch: `masks:witch:witch${number}`,
  };

  const mask = selectedMask ? maskType[selectedMask] : null;
  if (mask === null) {
    return NextResponse.json({
      error:
        "No haz seleccionado una máscara, por favor asegurate de seleccionar una máscara",
    });
  }
  const image_url = cloudinary.url(public_id, {
    transformation: [
      { overlay: mask },
      { flags: "region_relative", width: "1.0", crop: "scale" },
      {
        flags: "layer_apply",
        gravity: "faces",
        y: selectedMask === "witch" ? -(height / 3) : 0,
      },
    ],
  });

  return NextResponse.json({ image: image_url });
}
