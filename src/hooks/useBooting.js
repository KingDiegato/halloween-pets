"use client";
import { useUser } from "@/stores/username";
import {
  names,
  surnames,
  pictures,
  getRandomFullName,
  getRandomPicture,
} from "@/app/constants/contants";
import { useEffect } from "react";
export const useBooting = () => {
  const { picture, username, setUsername, setPicture } = useUser();

  useEffect(
    function setUser() {
      if (username && picture) return;
      const randomName = getRandomFullName(names, surnames);
      const randomPicture = getRandomPicture(pictures);
      setUsername(randomName);
      setPicture(randomPicture);
    },
    [setPicture, setUsername, username, picture]
  );
};
