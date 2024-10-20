"use client";
{
  /* eslint-disable @next/next/no-img-element */
  /* eslint-disable react-hooks/exhaustive-deps */
}

import { useEffect, useState } from "react";
import usePosts from "@/hooks/usePosts";
import { PostsScroll } from "@/components/postsScroll";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [visiblePostId, setVisiblePostId] = useState(null);
  function getAllPosts() {
    getPosts().then((res) => {
      setPosts(res.data);
    });
  }
  function updatePost(res) {
    setPosts((posts) => {
      return posts.map((post) => {
        if (post.id === res.data.id) {
          post.likes = res.data.likes;
          return post;
        }
        return post;
      });
    });
  }

  const { getPosts } = usePosts();

  useEffect(
    function posts() {
      getAllPosts();
    },
    [posts.length]
  );

  return (
    <div className="grid md:grid-cols-[0.5fr_1fr_0.5fr]  justify-items-center min-h-screen p-4 pb-20 gap-16 md:p-10 font-[family-name:var(--font-geist-sans)]">
      <aside>
        <div className="flex gap-4 text-[#ff7816] items-center">
          <img src="/icon/logo_54x30.svg" />
          <h1 className="text-xl font-extrabold">Halloween Pets</h1>
        </div>
      </aside>
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <PostsScroll
          posts={posts}
          updatePost={updatePost}
          visiblePostId={visiblePostId}
          setVisiblePostId={setVisiblePostId}
          getAllPosts={getAllPosts}
        />
      </main>
      <aside className="flex flex-col flex-grow w-full gap-2">
        <div className="flex min-h-[80dvh] border"></div>
        <button className="bg-[#ff7816] hover:bg-[#fd7301] text-white font-bold py-2 px-4 rounded">
          Publicar
        </button>
      </aside>
    </div>
  );
}
