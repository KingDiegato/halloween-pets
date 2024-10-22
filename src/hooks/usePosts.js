import supabase from "@/client/supabase";
import {
  getRandomFullName,
  names,
  surnames,
  getRandomPicture,
  pictures,
} from "@/app/constants/contants";
import { useUser } from "@/stores/username";

const usePosts = (filter) => {
  const { username, setUsername, picture, setPicture } = useUser();
  const getPosts = async () => {
    const { data: post, error: reqError } = await supabase
      .from("Publicacion")
      .select(filter || "*");

    if (reqError) {
      console.error("Error fetching posts:", reqError);
      return {
        data: null,
        error: {
          reqError,
        },
      };
    }

    const postsWithComments = await Promise.all(
      post?.map(async (p) => {
        const { data: comments, error: commentsError } = await supabase
          .from("Comentario")
          .select("*")
          .eq("publication", p.id);

        if (commentsError) {
          console.error(
            `Error fetching comments for post ${p.id}:`,
            commentsError
          );
          return { ...p, comments: [] }; // Si hay error, se devuelve sin comentarios
        }

        // Asignar los comentarios a la publicación correspondiente
        return { ...p, comments };
      })
    );

    return {
      data: postsWithComments,
      error: {
        reqError,
      },
    };
  };

  const insertPost = async (post) => {
    const { image, content } = post;
    const randomName = getRandomFullName(names, surnames);
    const randomPicture = getRandomPicture(pictures);
    if (!username) {
      setUsername(randomName);
    }
    if (!picture) {
      setPicture(randomPicture);
    }
    const { data, error } = await supabase.from("Publicacion").insert({
      name: username ? username : randomName,
      image,
      picture,
      content,
    });
    return { data, error };
  };

  const addComment = async (id, comment) => {
    const randomName = getRandomFullName(names, surnames);
    if (!username) {
      setUsername(randomName);
    }
    const { data, error } = await supabase.from("Comentario").insert({
      name: username ? username : randomName,
      publication: id,
      comment,
    });
    return { data, error };
  };

  const likePost = async (id) => {
    const { data: post } = await supabase
      .from("Publicacion")
      .select("likes")
      .eq("id", id)
      .single();
    const newLikes = post.likes + 1;
    await supabase.from("Publicacion").update({ likes: newLikes }).eq("id", id);

    const { data, error } = await supabase
      .from("Publicacion")
      .select()
      .eq("id", id)
      .single();
    return { data, error };
  };

  const removeLike = async (newPostLiked) => {
    console.log(newPostLiked);
    const { data: post } = await supabase
      .from("Publicacion")
      .select("likes")
      .eq("id", newPostLiked)
      .single();
    const newLikes = post.likes - 1;
    await supabase
      .from("Publicacion")
      .update({ likes: newLikes })
      .eq("id", newPostLiked);
    const { data, error } = await supabase
      .from("Publicacion")
      .select()
      .eq("id", newPostLiked)
      .single();
    return { data, error };
  };
  return { getPosts, insertPost, addComment, removeLike, likePost };
};

export default usePosts;
