import Image from "next/image";
import Link from "next/link";

export interface MenuItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  link: string;
  imgPath: string;
  title: string;
  description: string;
  blank?: boolean;
  disabled?: boolean;
  direction?: "col" | "row";
}

function MenuItem({ menu }: { menu: MenuItemProps }) {
  return (
    <>
      <Link
        href={menu.link}
        target={menu.blank ? "_blank" : "_self"}
        rel={menu.blank ? "noopener noreferrer" : undefined}
        className={`rounded-xl border border-accentgold bg-offwhite flex ${
          menu.direction === "col" ? "flex-col h-full text-center" : ""
        } gap-4 items-center p-4 ${menu.disabled ? "cursor-default opacity-50 pointer-events-none" : ""}`}
      >
        <Image src={menu.imgPath} width={70} height={70} alt={`${menu.title} 아이콘`} className="h-15 object-contain" />
        <span className="flex flex-col">
          <span className="text-lg text-t-primary">{menu.title}</span>
          <span className="text-sm">{menu.description}</span>
        </span>
      </Link>
    </>
  );
}

export default MenuItem;
