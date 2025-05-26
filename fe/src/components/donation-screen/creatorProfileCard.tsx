"use client"

import { Heart } from "lucide-react";
import { Separator } from "../ui/separator";
import { ProfileImageCard } from "./profileImageCreator";
import { ProfileInfoCard } from "./profileInfoCreator";
import { useContext } from "react";

export const CreatorProfileCard = () => {
   const {profile, setProfile} = useContext(Authcontext)

  return (
    <div className="flex flex-col gap-5 absolute z-0 left-[80px] top-[289px]">
        <div className="flex flex-col gap-5">
          <ProfileImageCard
            avatarImage={profile..data.avatarImage}
            profileName={profile.data.profileName}
            text1="Edit page"
          />
          <Separator />
          <ProfileInfoCard
            title={`About ${profile.data.profileName}`}
            text={profile.data.about}
          />
          <ProfileInfoCard
            title="Social Media URL"
            text={profile.data.socialMediaURL}
          />
          <div className="flex flex-col gap-3">
            <h3>Recent Supporters</h3>
            <div className="flex flex-col gap-1 p-6 rounded-lg border solid border-[#E4E4E7] bg-[#FFF] justify-center items-center">
              <Heart className="stroke-[#18181B] fill-[#18181B]" />
              <p className="text-base font-semibold leading-[24px] text-[#18181B] text-center">{`Be the first one to support ${profile.profileName} `}</p>
            </div>
          </div>
        </div>
    </div>
  );
};
