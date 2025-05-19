import { Camera } from "lucide-react";

export const AddCoverImage = () => {
  return (
    <div className="flex w-screen h-[319px] justify-center items-center bg-[#F4F4F5]">
      <input type="file" />
      <button className="flex gap-2">
        <Camera />
        Add a cover image
      </button>
    </div>
  );
};
