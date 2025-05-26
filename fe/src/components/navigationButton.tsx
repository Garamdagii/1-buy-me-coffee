"use client";

import { AuthContext } from "@/context/authContext";
import Image from "next/image";
import { useContext } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const UserInNavbar = () => {
  const { profile, setProfile } = useContext(AuthContext);

  const router = useRouter();
  const handleLogOut = () => {
    router.push("/log-in");
  };

  return (
    <div className="flex gap-2 h-40px w-full pt-[32px] pr-[80px] justify-center items-center">
      <Avatar>
        <AvatarImage src={profile?.message?.avatarImage} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p>{profile?.message?.profileName}</p>
      <div className="flex justify-center items-center">
        <Popover>
          <PopoverTrigger className="flex justify-center items-center">
            <ChevronDown />
          </PopoverTrigger>
          <PopoverContent className="flex w-fit h-fit">
            <Button
              variant="secondary"
              className="flex h-[40px] px-4 py-2 justify-center items-center rounded-md text-sm font-medium leading-[20px] text-[#18181B]"
              onClick={handleLogOut}
            >
              Log out
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
