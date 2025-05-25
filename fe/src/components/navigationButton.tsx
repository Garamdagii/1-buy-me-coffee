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

export const UserInNavbar = () => {
  const { profile, setProfile } = useContext(AuthContext);
  console.log(profile, "nav");

  return (
    <div>
      <div>
        <div>
          <Avatar>
            <AvatarImage src={profile.message.avatarImage} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>{profile.message.profileName}</p>
        </div>
      </div>
      <div>
        <Popover>
          <PopoverTrigger>
            <ChevronDown />
          </PopoverTrigger>
          <PopoverContent>Logout</PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
