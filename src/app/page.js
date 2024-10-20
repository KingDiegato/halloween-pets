"use client";
{
  /* eslint-disable @next/next/no-img-element */
  /* eslint-disable react-hooks/exhaustive-deps */
}

import { useEffect, useState } from "react";
import usePosts from "@/hooks/usePosts";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaHeartBroken } from "react-icons/fa";
import { LiaHeartBrokenSolid } from "react-icons/lia";
import { FaRegCommentDots } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { AiOutlineSend } from "react-icons/ai";
import { useLike } from "@/stores/like";
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

  const { getPosts, insertPost, addComment, likePost } = usePosts();
  const { likes, dislikes, setLike, removeLike, IDislike } = useLike(
    (state) => state
  );
  useEffect(
    function posts() {
      getAllPosts();
    },
    [posts.length]
  );

  const handleComment = async (e, id, comment) => {
    e.preventDefault();
    try {
      await addComment(id, comment);
      getAllPosts();
      e.target.reset();
      return "ok";
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="grid md:grid-cols-[0.5fr_1fr_0.5fr] items-center justify-items-center min-h-screen p-4 pb-20 gap-16 md:p-10 font-[family-name:var(--font-geist-sans)]">
      <aside>
        <div>
          <p>content aside</p>
        </div>
      </aside>
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <PostsScroll
          IDislike={IDislike}
          dislikes={dislikes}
          likes={likes}
          likePost={likePost}
          posts={posts}
          removeLike={removeLike}
          updatePost={updatePost}
          visiblePostId={visiblePostId}
          setVisiblePostId={setVisiblePostId}
          setLike={setLike}
        />
      </main>
      <aside>
        <div>
          <p>content aside</p>
        </div>
      </aside>
    </div>
  );
}
