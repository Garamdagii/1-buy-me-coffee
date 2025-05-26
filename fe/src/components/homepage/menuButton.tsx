import { ExternalLink } from "lucide-react";

export const MenuButton = ({
  children,
  isViewPage,
}: {
  children: string;
  isViewPage: boolean;
}) => {
  return (
    <button
      className="flex w-[250px] h-[36px] px-4 py-2 items-center gap-2 rounded-md bg-[#FFF] text-sm font-medium leading-[20px] text-[#09090B]
    "
    >
      {children}
      {isViewPage && <ExternalLink className="size-[16px] stroke-[#18181B]" />}
    </button>
  );
};
