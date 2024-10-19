"use client";
{
  /* eslint-disable @next/next/no-img-element */
  /* eslint-disable react-hooks/exhaustive-deps */
}

import { useEffect, useRef, useState } from "react";
import usePosts from "@/hooks/usePosts";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const { getPosts, insertPost, addComment } = usePosts();

  useEffect(
    function getAllPosts() {
      getPosts().then((res) => {
        setPosts(res.data);
      });
    },
    [posts.length]
  );

  const handleComment = async (e, id, comment) => {
    e.preventDefault();
    try {
      await addComment(id, comment);
      await getPosts().then((res) => setPosts(res.data));
      e.target.reset();
      return "ok";
    } catch (err) {
      console.log(err);
    }
  };
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

        {posts.map((post) => {
          return (
            <div key={post.id}>
              <img
                src={post.picture}
                alt="pfp"
                width={36}
                height={36}
                className="rounded-full"
              />
              <h2>{post.name}</h2>
              <p>{post.content}</p>
              <img src={post.image} alt="image" width={200} height={200} />
              <span>{post.likes}</span>
              <form
                onSubmit={(e) =>
                  handleComment(e, post.id, e.target.comment.value)
                }
              >
                <input
                  type="text"
                  name="comment"
                  placeholder="Comenta que te pareció"
                />
                <button type="submit">Comentar</button>
              </form>
              {post.comments?.map((comment) => {
                return (
                  <div key={comment.id}>
                    <h1>{comment.publication === post.id && comment.name}</h1>
                    <p>{comment.publication === post.id && comment.comment}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </main>
    </div>
  );
}
