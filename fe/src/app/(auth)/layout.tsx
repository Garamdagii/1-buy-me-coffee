import { LayoutImage } from "@/components";
import { HeaderButton } from "@/components/headerButton";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-screen h-screen">
      <div className="flex justify-center items-center w-1/2 h-full bg-amber-400">
        <LayoutImage />
      </div>
      <div className="flex justify-center items-center w-1/2 h-full">
        {children}
      </div>
    </div>
  );
}
