"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import React, { FC } from "react";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: FC<ListingHeadProps> = ({
  title,
  id,
  imageSrc,
  locationValue,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <div>
      <Heading
        title={title}
        subtitle={`${location?.label}, ${location?.region}`}
      />

      <div className="w-full h-[60vh] mt-3 overflow-hidden rounded-xl relative">
        <Image
          fill
          src={imageSrc}
          alt={title}
          className="w-full object-cover"
        />

        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default ListingHead;
