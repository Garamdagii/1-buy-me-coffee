import { MenuButton } from "./menuButton";

export const Sidebar = () => {
  return (
    <div className="flex flex-col absolute left-[80px] pt-[100px] w-fit h-screen">
      <MenuButton isViewPage={false}>Home</MenuButton>
      <MenuButton isViewPage={false}>Explore</MenuButton>
      <MenuButton isViewPage={true}>View page</MenuButton>
      <MenuButton isViewPage={false}>Account settings</MenuButton>
    </div>
  );
};
