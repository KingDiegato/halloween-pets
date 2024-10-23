"use client";
{
  /* eslint-disable @next/next/no-img-element */
  /* eslint-disable react-hooks/exhaustive-deps */
}

import { useEffect, useState } from "react";
import usePosts from "@/hooks/usePosts";
import { PostsScroll } from "@/components/postsScroll";
import Link from "next/link";
import { useBooting } from "@/hooks/useBooting";

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
  useBooting();
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
        <div className="sticky top-2 flex gap-4 text-[#ff7816] items-center">
          <img src="/icon/logo_54x30.svg" alt="logo" />
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
        <div className="flex-col p-3  sticky top-2 flex min-h-[80dvh] border">
          <article id="ads" className="h-full text-center flex flex-col gap-8">
            <h2>This proyect is partner with</h2>
            <a href="https://cloudinary.com/" target="_blank" rel="noreferrer">
              <img src="/partners/cloudinary_partner.png" alt="cloudinary" />
            </a>
            <a
              href="https://acheipneus.com.br/"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/partners/logo_achei.svg" alt="acheipneus" />
            </a>
            <a href="https://supabase.com/" target="_blank" rel="noreferrer">
              <img src="/partners/supabase.png" alt="supabase" />
            </a>
          </article>
          <Link
            href={"/new/post"}
            className="bg-[#ff7816] text-center hover:bg-[#fd7301] sticky top-2 text-white font-bold py-2 px-4 rounded"
          >
            Publicar
          </Link>
        </div>
      </aside>
    </div>
  );
}
