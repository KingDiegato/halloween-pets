import supabase from "@/client/supabase";

const posts = supabase.from("Publicacion");

const usePosts = () => {
  const getPosts = async () => {
    const { data, error } = await posts.select("name");
    return { data, error };
  };

  return { getPosts };
};

export default usePosts;
