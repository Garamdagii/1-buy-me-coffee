import { Heart } from "lucide-react";
import { Separator } from "../ui/separator";
import { ProfileImageCard } from "./profileImageCreator";
import { ProfileInfoCard } from "./profileInfoCreator";

const mocdata = [
  {
    profileName: "User1",
    about:
      "All day, every day, we're watching, listening to, reading and absorbing politics. It's exhausting. We then report on what we've seen in a way that's as chill as possible. None of the sensationalism and division you'll find elsewhere. It's about clarity, focus, approachability, and having a little wry smile almost all the time.",
    avatarImage: "https://cdn-icons-png.flaticon.com/256/5046/5046940.png",
    socialMediaURL: "https://buymeacoffee.com/baconpancakes1",
  },
];

export const DonationScreenProfile = () => {
  return (
    <div className="flex flex-col gap-5">
      {mocdata.map((profile, index) => (
        <div key={index} className="flex flex-col gap-5">
          <ProfileImageCard
            avatarImage={profile.avatarImage}
            profileName={profile.profileName}
            text1="Edit page"
          />
          <Separator />
          <ProfileInfoCard
            title={`About ${profile.profileName}`}
            text={profile.about}
          />
          <ProfileInfoCard
            title="Social Media URL"
            text={profile.socialMediaURL}
          />
          <div className="flex flex-col gap-3">
            <h3>Recent Supporters</h3>
            <div className="flex flex-col gap-1 p-6 rounded-lg border solid border-[#E4E4E7] bg-[#FFF] justify-center items-center">
              <Heart className="stroke-[#18181B] fill-[#18181B]" />
              <p className="text-base font-semibold leading-[24px] text-[#18181B] text-center">{`Be the first one to support ${profile.profileName} `}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
