"use client";

import { FC } from "react";
import { Range } from "react-date-range";
import Calender from "../inputs/Calender";
import Button from "../Button";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates?: Date[];
}

const ListingReservation: FC<ListingReservationProps> = ({
  price,
  totalPrice,
  onChangeDate,
  onSubmit,
  dateRange,
  disabled,
  disabledDates,
}) => {
  return (
    <div className="rounded-xl bg-white border border-neutral-200 overflow-hidden">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>

      <hr />

      <Calender
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />

      <hr />

      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>

      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <span>Total</span>

        <span>$ {totalPrice}</span>
      </div>
    </div>
  );
};

export default ListingReservation;
