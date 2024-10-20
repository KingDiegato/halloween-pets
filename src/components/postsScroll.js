import usePosts from "@/hooks/usePosts";
import { useLike } from "@/stores/like";
import { AiOutlineSend } from "react-icons/ai";
import { FaHeartBroken } from "react-icons/fa";
import { FaHeart, FaRegCommentDots, FaRegHeart } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
import { LiaHeartBrokenSolid } from "react-icons/lia";

{
  /* eslint-disable @next/next/no-img-element */
  /* eslint-disable react-hooks/exhaustive-deps */
}

export const PostsScroll = ({
  posts,
  visiblePostId,
  setVisiblePostId,
  updatePost,
  getAllPosts,
}) => {
  const { likes, dislikes, setLike, removeLike, IDislike } = useLike(
    (state) => state
  );
  const { likePost, removeLike: dislikePost, addComment } = usePosts();

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

  return posts.map((post) => {
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
              setVisiblePostId(visiblePostId === post.id ? null : post.id);
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
                  dislikePost(post.id).then((res) => {
                    updatePost(res);
                    removeLike(post.id);
                  });
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
            <button
              onClick={() => {
                IDislike(post.id);
              }}
            >
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
            onSubmit={(e) => handleComment(e, post.id, e.target.comment.value)}
            className="flex gap-4 p-2"
          >
            <input
              type="text"
              name="comment"
              placeholder="Comenta que te pareció"
              className="w-full focus:outline-none h-8 p-2 border border-slate-300 rounded-lg"
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
  });
};
