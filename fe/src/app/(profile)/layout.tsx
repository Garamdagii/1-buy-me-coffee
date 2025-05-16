export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex w-screen h-screen">{children}</div>;
}
