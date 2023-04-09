"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"}>
      <Image
        src={"/assets/logo.png"}
        alt="airbnb_logo_image"
        width={"100"}
        height={"100"}
        className="h-8 hidden md:block overflow-hidden"
      />
    </Link>
  );
};

export default Logo;
