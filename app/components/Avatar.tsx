"use client";

import Image from "next/image";
import React, { FC } from "react";

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar: FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      src={src || "/assets/placeholder.png"}
      alt="avatar_image"
      width={"30"}
      height={"30"}
      className="rounded-full"
    />
  );
};

export default Avatar;
