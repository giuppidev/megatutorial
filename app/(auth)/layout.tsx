export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex items-center justify-center w-full bg-primary bg-opacity-20">
      {children}
    </main>
  );
}
