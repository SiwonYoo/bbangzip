import Link from "next/link";

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: "full" | "fit";
  href: string;
}

function LinkButton({ children, href, size = "full", className, ...rest }: LinkButtonProps) {
  const btnSize = {
    full: "w-full p-4",
    fit: "w-fit px-4 py-2",
  };

  return (
    <>
      <Link
        href={href}
        className={`rounded-xl border border-accentdark bg-white hover:bg-accentgold text-center cursor-pointer ${btnSize[size]} ${className ?? ""}`.trim()}
        {...rest}
      >
        {children}
      </Link>
    </>
  );
}

export default LinkButton;
