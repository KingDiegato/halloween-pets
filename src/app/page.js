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
        {posts.map((post) => {
          return (
            <div key={post.id}>
              <div className="flex gap-4 font-extrabold text-slate-600 text-xl p-1">
                <img
                  src={post.picture}
                  alt="pfp"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <h2>{post.name}</h2>
              </div>
              <p className="text-slate-600 line-clamp-3">{post.content}</p>
              <img
                className="aspect-video object-cover rounded-t-lg"
                src={post.image}
                alt="image"
                width="100%"
                height={200}
              />
              <div
                id="under-bar"
                className={`flex justify-between align-baseline text-lg p-2 border ${
                  visiblePostId === post.id ? "border-b-0" : "rounded-b-lg"
                }`}
              >
                <button
                  type="button"
                  className="flex gap-4"
                  onClick={() => {
                    setVisiblePostId(
                      visiblePostId === post.id ? null : post.id
                    );
                  }}
                >
                  <FaRegCommentDots size={24} />
                  {post.comments.length}
                </button>
                <div className="flex gap-2 font-semibold">
                  <span>{post.likes}</span>
                  <button
                    onClick={() => {
                      if (likes.includes(post.id)) {
                        removeLike(post.id);
                        return;
                      }
                      likePost(post.id).then((res) => {
                        setLike(post.id);
                        updatePost(res);
                      });
                    }}
                  >
                    {likes.includes(post.id) && !dislikes.includes(post.id) ? (
                      <FaHeart size={24} color="red" />
                    ) : (
                      <FaRegHeart size={24} />
                    )}
                  </button>
                  <button onClick={() => IDislike(post.id)}>
                    {dislikes.includes(post.id) ? (
                      <FaHeartBroken size={24} />
                    ) : (
                      <LiaHeartBrokenSolid size={24} />
                    )}
                  </button>
                </div>
                <div className="flex gap-2 font-semibold">
                  <FiShare2 size={24} />
                </div>
              </div>
              <div
                id="comments"
                className={`${
                  visiblePostId === post.id ? " " : "hidden "
                } border border-t-0`}
              >
                <form
                  onSubmit={(e) =>
                    handleComment(e, post.id, e.target.comment.value)
                  }
                  className="flex gap-4 p-2"
                >
                  <input
                    type="text"
                    name="comment"
                    placeholder="Comenta que te pareció"
                    className="w-full h-8 p-2 border border-slate-300 rounded-lg"
                  />
                  <button type="submit">
                    <AiOutlineSend size={24} />
                  </button>
                </form>
                {post.comments?.map((comment) => {
                  return (
                    <div key={comment.id} className="px-4 text-slate-600">
                      <div className="flex flex-col pb-3">
                        <h2 className="font-bold ">
                          {comment.publication === post.id && comment.name}
                        </h2>
                        <p className="pl-2">
                          {comment.publication === post.id && comment.comment}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>
      <aside>
        <div>
          <p>content aside</p>
        </div>
      </aside>
    </div>
  );
}
