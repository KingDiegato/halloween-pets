"use client";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImageInput } from "@/components/imageInput";
import { CldImage } from "next-cloudinary";
import usePosts from "@/hooks/usePosts";
import { fileValidator } from "@/app/utils/fileValidator";
import Image from "next/image";
import Link from "next/link";

export default function Post() {
  const [binary, setBinary] = useState("");
  const [error, setError] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
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

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    preventDropOnDocument: true,
    validator: (file) => fileValidator(file, setError),
  });
  const { getPosts } = usePosts();

  useEffect(
    function getAllPosts() {
      getPosts().then((res) => console.log(res));
    },
    [getPosts]
  );
  return (
    <div className=" items-center justify-items-center min-h-screen p-8 gap-16 sm:px-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="text-3xl font-extrabold text-[#ff7816] ">
          Halloween Pets
        </h1>
        <p>Sube una foto de tu gato o perro para disfrazarlo y publicarlo!</p>
        <form>
          <textarea
            className="w-[320px] sm:w-[500px] focus:outline-none h-16 p-2 border border-slate-300 rounded-lg"
            type="text"
            placeholder="En que estas pensando?"
          />
        </form>

        {binary ? (
          <>
            <CldImage width={600} height={420} src={binary} alt="My-pet" />
            <div className="flex gap-6 ">
              <button className="bg-[#ff7816] text-white font-bold py-2 px-4 rounded self-end">
                Crear publicación!
              </button>
              <button
                className="text-[#ff7816] bg-white border border-[#ff7816] font-bold py-2 px-4 rounded self-end"
                onClick={() => setBinary("")}
              >
                Intentar con otra
              </button>
            </div>
          </>
        ) : (
          <ImageInput
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
          />
        )}
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
