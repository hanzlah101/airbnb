"use client";

import { FC } from "react";
import { SafeUser } from "../types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavourite from "../hooks/useFavourite";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: FC<HeartButtonProps> = ({ listingId, currentUser }) => {
  const { toggleFavourite, hasFavourited } = useFavourite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavourite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="absolute -top-[2px] -right-[2px] fill-white"
      />

      <AiFillHeart
        size={24}
        className={hasFavourited ? "fill-primary" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
