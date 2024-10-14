"use client";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Home() {
  const [binary, setBinary] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
        const blob = new Blob([binaryStr], { type: "image/png" });
        const url = URL.createObjectURL(blob);

        setBinary(url);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });
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

        {binary && <img src={`${binary}`} />}

        <div
          className="cursor-pointer border-dashed border-amber-500 border-2 rounded-lg p-6 text-center"
          {...getRootProps()}
          action="/target"
          id="target"
        >
          <input
            {...getInputProps()}
            className="bg-red-500 w-full h-8"
            placeholder="sono qui"
          />
          {isDragActive ? (
            <p>Suelta la imagen aqui...</p>
          ) : (
            <p>Click para subir o intenta soltar una imagen</p>
          )}
        </div>
      </main>
    </div>
  );
}
