"use client";

import React, { FC, useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((cur) => !cur);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal]);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={onRent}
          className="hidden lg:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb Your Home
        </div>

        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border border-neutral-2 00 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />

          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md min-w-[200px] max-w-[200px] w-[40vw] z-[100] border md:w-3/4 bg-white overflow-hidden right-0 text-sm top-12">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <div>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="My Trips"
                />

                <MenuItem
                  onClick={() => router.push("/favourites")}
                  label="My Favourites"
                />

                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="My Reservations"
                />

                <MenuItem
                  onClick={() => router.push("/properties")}
                  label="My Properties"
                />

                <MenuItem onClick={rentModal.onOpen} label="Airbnb my Home" />

                <hr />

                <MenuItem onClick={() => signOut()} label="Logout" />
              </div>
            ) : (
              <div>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Signup" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;