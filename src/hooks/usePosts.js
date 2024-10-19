import supabase from "@/client/supabase";
import { myName } from "@/app/constants/contants";

const posts = supabase.from("Publicacion");
const comments = supabase.from("Comentario");

const usePosts = (filter) => {
  const getPosts = async () => {
    let postIndex;
    const { data: post, error: reqError } = await posts.select(filter || "*");
    for (let i = 0; i < post.length; i++) {
      postIndex = i;
    }
    const { data: comment, error: commentsError } = await comments
      .select("*")
      .eq("publication", post[postIndex]?.id);
    return {
      data: post,
      comments: comment,
      error: {
        reqError,
        commentsError,
      },
    };
  };

  const insertPost = async (post) => {
    const { image, picture, content } = post;
    const { data, error } = await posts.insert({ image, picture, content });
    return { data, error };
  };

  const addComment = async (id, comment) => {
    const { data, error } = await comments.insert({
      name: myName,
      publication: id,
      comment,
    });
    return { data, error };
  };

  return { getPosts, insertPost, addComment };
};

export default usePosts;
