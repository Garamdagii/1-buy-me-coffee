import Image from "next/image";

export const LayoutImage = () => {
  return (
    <div className="flex flex-col gap-10 justify-center items-center w-[455px]">
      <Image
        width={240}
        height={240}
        priority
        src="/logo.png"
        alt="logo"
        style={{ width: "auto", height: "auto" }}
      />
      <div className="flex flex-col gap-3 items-center justify-center">
        <h3 className="text-2xl font-bold text-[#09090B]">
          Fund your creative work
        </h3>
        <p className="text-base leading-[24px] text-[#09090B]">
          Accept support. Start a membership. Setup a shop. It’s easier than you
          think.
        </p>
      </div>
    </div>
  );
};
