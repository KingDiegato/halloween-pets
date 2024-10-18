import supabase from "@/client/supabase";

const posts = supabase.from("Publicacion");

const usePosts = (filter) => {
  const getPosts = async () => {
    const { data, error } = await posts.select(filter || "*");
    return { data, error };
  };

  return { getPosts };
};

export default usePosts;
