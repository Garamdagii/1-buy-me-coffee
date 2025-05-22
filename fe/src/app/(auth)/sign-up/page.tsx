import { SignUpAccount } from "@/components/auth/signUp";
import { HeaderButton } from "@/components/headerButton";

const SignUpPage = () => {
  return (
    <div>
      <HeaderButton isLogin={false} />
      <SignUpAccount />
    </div>
  );
};

export default SignUpPage;
