function MenuLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col min-h-screen w-full max-w-3xl bg-offwhite">{children}</div>
    </>
  );
}

export default MenuLayout;
