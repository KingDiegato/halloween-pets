import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useLike = create(
  persist(
    (set, get) => ({
      likes: [],
      dislikes: [],
      setLike: (newPostLiked) => {
        const currentLikes = get().likes;
        if (!currentLikes.includes(newPostLiked)) {
          set({
            likes: [...currentLikes, newPostLiked],
          });
        }
      },
      removeLike: (newPostLiked) => {
        const currentLikes = get().likes;
        if (currentLikes.includes(newPostLiked)) {
          set({
            likes: currentLikes.filter((like) => like !== newPostLiked),
          });
        }
      },
      IDislike: (newPostDisliked) => {
        const currentDislikes = get().dislikes;
        if (!currentDislikes.includes(newPostDisliked)) {
          set({
            dislikes: [...currentDislikes, newPostDisliked],
          });
        }
        if (currentDislikes.includes(newPostDisliked)) {
          set({
            dislikes: currentDislikes.filter(
              (dislike) => dislike !== newPostDisliked
            ),
          });
        }
      },
    }),
    {
      name: "liked",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
