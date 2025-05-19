import Image from "next/image";

export const ProfileImageCard = ({
  avatarImage,
  profileName,
  text1,
}: {
  avatarImage: string;
  profileName: string;
  text1: string;
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 justify-center items-center">
        <div className="flex relative w-[40px] h-[40px]">
          <Image
            // width={40}
            // height={40}
            src={avatarImage}
            alt="image"
            fill={true}
            className="rounded-full"
          />
        </div>
        <h3 className="text-xl font-bold leading-[24px] text-[#09090B]">
          {profileName}
        </h3>
      </div>
      <button className="flex h-[40px] px-4 py-2 justify-center items-center rounded-md bg-[#F4F4F5] text-sm font-medium leading-[20px] text-[#18181B]">
        {text1}
      </button>
    </div>
  );
};
