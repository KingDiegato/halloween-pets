"use client";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImageInput } from "@/components/imageInput";
import { CldImage } from "next-cloudinary";
import { fileValidator } from "@/app/utils/fileValidator";
import Image from "next/image";
import Link from "next/link";
import { useTransform } from "@/stores/transform";
import usePosts from "@/hooks/usePosts";
import { useRouter } from "next/navigation";
{
  /* eslint-disable @next/next/no-img-element */
}

export default function Post() {
  const [binary, setBinary] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [transformedImage, setTransformedImage] = useState("");
  const [comment, setComment] = useState("");
  const { data, setData, clearStore } = useTransform((state) => state);
  const { insertPost } = usePosts();
  const router = useRouter();
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      setImage(file);
      const reader = new FileReader();
      reader.onabort = () => setError("File reading was aborted");
      reader.onerror = () => setError("Error reading the file");
      reader.onload = () => {
        const binaryStr = reader.result;
        const blob = new Blob([binaryStr], { type: "image/png" });
        const url = URL.createObjectURL(blob);
        setError("");
        setBinary(url);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const handlePost = async () => {
    insertPost({
      image: transformedImage,
      content: comment,
    }).then((res) => {
      if (res.data) {
        clearStore();
        setComment("");
        setTransformedImage("");
        setImage("");
      }
      router.push("/");
    });
  };
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    preventDropOnDocument: true,
    validator: (file) => fileValidator(file, setError),
  });
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();

    formData.append("image", image);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setData({ ...data });
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className=" items-center justify-items-center min-h-screen p-8 gap-16 sm:px-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="text-3xl font-extrabold text-[#ff7816] ">
          Halloween Pets
        </h1>
        <p>Sube una foto de tu gato o perro para disfrazarlo y publicarlo!</p>

        {transformedImage && (
          <img
            width={600}
            height={420}
            src={transformedImage}
            alt="devuelveme algo"
            className="w-full md:w-[600px]"
          />
        )}

        <textarea
          className="w-[320px] sm:w-[500px] focus:outline-none h-16 p-2 border border-slate-300 rounded-lg"
          type="text"
          onChange={(e) => setComment(e.target.value)}
          placeholder="En que estas pensando?"
        />
        {transformedImage && (
          <button
            onClick={handlePost}
            className="bg-[#ff7816] text-white font-bold py-2 px-4 rounded"
          >
            Publicar!
          </button>
        )}
        {binary ? (
          <>
            <CldImage width={600} height={420} src={binary} alt="My-pet" />
            {!data.url && (
              <div className="flex gap-6 ">
                <button
                  type="submit"
                  form="uploadForm"
                  className="bg-[#ff7816] text-white font-bold py-2 px-4 rounded self-end"
                >
                  Subir Imagen!
                </button>
                <button
                  type="reset"
                  className="text-[#ff7816] bg-white border border-[#ff7816] font-bold py-2 px-4 rounded self-end"
                  onClick={() => {
                    setBinary("");
                    setTransformedImage("");
                    clearStore();
                  }}
                >
                  Intentar con otra
                </button>
              </div>
            )}

            {data.ok && (
              <div className="flex gap-6">
                <button
                  type="reset"
                  className="text-[#ff7816] bg-white border border-[#ff7816] font-bold py-2 px-4 rounded self-end"
                  onClick={() => {
                    setBinary("");
                    setTransformedImage("");
                    clearStore();
                  }}
                >
                  Intentar con otra
                </button>
                <button
                  className="bg-[#ff7816] text-white font-bold py-2 px-4 rounded self-end"
                  onClick={async () => {
                    if (image) {
                      if (!data.public_id) return;
                      const response = await fetch("/api/transform", {
                        method: "POST",
                        body: JSON.stringify(data),
                      });

                      const res = await response.json();
                      setTransformedImage(res.image);
                    }
                  }}
                >
                  Crear Transformación
                </button>
              </div>
            )}

            {data.error && <p className="text-red-500">{data.error}</p>}
          </>
        ) : (
          ""
        )}
        <ImageInput
          className={`${binary ? "hidden" : ""}`}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
          onSubmit={handleSubmit}
        />

        {error && <p className="text-red-500">{error}</p>}
        <Link href="/">
          <Image
            width={600}
            height={420}
            className="w-full md:w-[600px]"
            src="/icon/logo_780x486.webp"
            alt="logo-full-size"
          />
        </Link>
      </main>
    </div>
  );
}
