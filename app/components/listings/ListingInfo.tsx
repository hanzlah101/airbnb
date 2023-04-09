"use client";

import { FC } from "react";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), { ssr: false });

interface ListingInfoProps {
  user: SafeUser | null;
  description: string;
  locationValue: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
}

const ListingInfo: FC<ListingInfoProps> = ({
  user,
  description,
  locationValue,
  roomCount,
  bathroomCount,
  guestCount,
  category,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex items-center gap-2">
          <span>Hosted By {user?.name}</span>
          <Avatar src={user?.image} />
        </div>

        <div className="flex items-center gap-4 text-base font-light text-neutral-500">
          <span>{guestCount} guests</span>
          <span>{roomCount} rooms</span>
          <span>{bathroomCount} bathrooms</span>
        </div>
      </div>

      <hr />

      {category && (
        <ListingCategory
          icon={category?.icon}
          label={category?.label}
          description={category?.description}
        />
      )}

      <hr />

      <div className="text-lg font-light text-neutral-500">{description}</div>

      <hr />

      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
