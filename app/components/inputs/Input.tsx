"use client";

import React, { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}

      <input
        type={type}
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        className={`block w-full px-6 pt-6 pb-1 text-[1rem] outline-none focus:outline-none rounded-md appearance-none bg-white border peer
        ${formatPrice ? "pl-9" : "pl-4"}
        ${
          errors[id]
            ? "border-primary focus:border-primary"
            : "border-neutral-300 focus:border-black transition"
        }
        `}
      />

      <label
        className={`absolute duration-150 text-[1rem] transform scale-75 -translate-y-3 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3
      ${formatPrice ? "left-9" : "left-[1rem]"}
      ${errors[id] ? "text-primary" : "text-neutral-400"}
      `}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
