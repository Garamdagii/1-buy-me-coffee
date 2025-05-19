export const ProfileInfoCard = ({
  title,
  text,
}: {
  title: string;
  text: string;
}) => {
  return (
    <div className="flex flex-col gap-3 p-6 rounded-lg border solid border-[#E4E4E7] bg-[#FFF]">
      <h3 className="text-base text-semibold leading-[24px] text-[#18181B]">
        {title}
      </h3>
      <p className="text-sm  leading-[20px] text-[#09090B]">{text}</p>
    </div>
  );
};
