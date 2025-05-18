import { LogInAccount } from "@/components/auth/logIn";
import { HeaderButton } from "@/components/headerButton";

const LogInPage = () => {
  return (
    <div>
      <HeaderButton isLogin={true} />
      <LogInAccount />
    </div>
  );
};

export default LogInPage;
