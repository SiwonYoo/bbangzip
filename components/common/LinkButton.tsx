import Link from "next/link";

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  size: "full" | "fit";
  href: string;
}

function LinkButton({ children, size, href, ...rest }: LinkButtonProps) {
  const btnSize = {
    full: "w-full",
    fit: "w-fit",
  };

  return (
    <>
      <Link
        href={href}
        className={`p-4 my-2 rounded-xl border border-accentdark bg-wihte hover:bg-accentgold text-center cursor-pointer ${btnSize[size]}`}
        {...rest}
      >
        {children}
      </Link>
    </>
  );
}

export default LinkButton;
