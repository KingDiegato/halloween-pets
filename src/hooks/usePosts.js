import supabase from "@/client/supabase";
import { myName } from "@/app/constants/contants";

const posts = supabase.from("Publicacion");
const comments = supabase.from("Comentario");

const usePosts = (filter) => {
  const getPosts = async () => {
    const { data: post, error: reqError } = await posts.select(filter || "*");
    if (reqError) {
      console.error("Error fetching posts:", reqError);
    } else {
      for (const p of post) {
        const { data: comments, error: commentsError } = await supabase
          .from("Comentario")
          .select("*")
          .eq("publication", p.id);

        if (commentsError) {
          console.error(
            `Error fetching comments for post ${p.id}:`,
            commentsError
          );
        } else {
          p.comments = comments; // Asignar los comentarios a la publicación correspondiente
        }
      }
    }

    return {
      data: post,
      error: {
        reqError,
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
