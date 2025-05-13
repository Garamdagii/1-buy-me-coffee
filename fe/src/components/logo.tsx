import { Coffee } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex gap-2 pt-[32px] pl-[80px] h-[20px] w-fit justify-center items-center fixed">
      <Coffee className="size-[20px] stroke-[#09090B] stroke-2" />
      <h4 className="text-base font-bold leading-[20px] text-[#09090B] self-center">
        Buy Me Coffee
      </h4>
    </div>
  );
};
