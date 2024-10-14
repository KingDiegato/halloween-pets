"use client";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useCallback, useLayoutEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { fileValidator } from "./utils/fileValidator";
import { ImageInput } from "@/components/imageInput";

export default function Home() {
  const [binary, setBinary] = useState("");
  const [error, setError] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        console.log(binaryStr);
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
  useLayoutEffect(() => {}, []);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* <CldUploadWidget
          signatureEndpoint="<API Endpoint (ex: /api/sign-cloudinary-params)>"
          options={{
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            sources: ["local", "url", "camera"],
            maxFiles: 1,
            multiple: false,
            maxFileSize: 5 * 1024 * 1024,
            language: "en",
            folder: "pets",
            styles: {
              color: "red",
            },
          }}
        >
          {({ open, ...rest }) => {
            return (
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                onClick={() => open()}
              >
                Upload an Image
              </button>
            );
          }}
        </CldUploadWidget> */}

        {binary ? (
          <>
            <img src={`${binary}`} alt="My-pet" width={600} height={420} />
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded self-end"
              onClick={() => setBinary("")}
            >
              Intentar con otra
            </button>
          </>
        ) : (
          <ImageInput
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
          />
        )}
        {error && <p className="text-red-500">{error}</p>}
      </main>
    </div>
  );
}
