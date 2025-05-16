"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export const HeaderButton = ({ isLogin }: { isLogin: boolean }) => {
  const router = useRouter();

  const handleSignUpPage = () => {
    router.push("/log-in");
  };
  const handleLogInPage = () => {
    router.push("/sign-up");
  };

  return (
    <Button
      variant="secondary"
      className="inline-flex h-[40px] px-4 py-2 justify-center items-center rounded-md absolute top-[32px] right-[80px]"
      onClick={isLogin ? handleLogInPage : handleSignUpPage}
    >
      {isLogin ? (
        <p className="text-sm font-medium leading-[20px] text-[#18181B]">
          Sign up
        </p>
      ) : (
        <p className="text-sm font-medium leading-[20px] text-[#18181B]">
          Log in
        </p>
      )}
    </Button>
  );
};
