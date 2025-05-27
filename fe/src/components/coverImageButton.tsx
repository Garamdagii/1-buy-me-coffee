import { Camera } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  children: string;
  className: string;
  isChangeCover: boolean;
  onClick: () => void;
};

export const CoverImageButton = (data: Props) => {
  const { children, className, isChangeCover, onClick } = data;
  return (
    <div>
      <Button
        onClick={onClick}
        className={
          `flex px-4 py-2 h-[40px] justify-center items-center gap-2 rounded-md text-sm font-medium leading-[20px]` +
          className
        }
      >
        {isChangeCover && <Camera className="size-[16px] stroke-[#18181B]" />}
        {children}
      </Button>
    </div>
  );
};
