"use client";

import { FC, MouseEvent, useCallback, useMemo } from "react";
import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: SafeListing;
  currentUser: SafeUser | null;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}

const ListingCard: FC<ListingCardProps> = ({
  data,
  reservation,
  disabled,
  currentUser,
  actionId = "",
  actionLabel,
  onAction,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data?.locationValue);

  const handleCancel = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data?.price;
  }, [reservation, data?.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listing/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap- w-full">
        <div className="aspect-square relative w-full overflow-hidden rounded-xl">
          <Image
            fill
            src={data.imageSrc}
            alt={data.title}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />

          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>

        <div className="font-semibold text-base mt-2">
          {location?.label}, {location?.region}
        </div>

        <div className="font-light text-neutral-500">
          {reservationDate ? (
            <div className="text-sm my-1">{reservationDate}</div>
          ) : (
            data.category
          )}
        </div>

        <div className="font-semibold flex items-center gap-1">
          $ {price}
          {!reservation && <span className="font-light">night</span>}
        </div>

        {onAction && actionLabel && (
          <div className="mt-3">
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
