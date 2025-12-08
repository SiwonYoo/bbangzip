import Image from "next/image";
import { BreadType, CategoryType } from "@/types";
import { Bookmark } from "lucide-react";

function BreadCard({ bread, category }: { bread: BreadType; category: CategoryType }) {
  return (
    <>
      <div className="relative z-0 flex flex-col gap-2 items-center rounded-xl p-4 bg-white">
        <Bookmark stroke="var(--color-primary)" fill="white" className="absolute right-4 bg-white" />
        <Image src={bread.images.official} width={200} height={200} alt={bread.name} className="aspect-square" />
        <div className="text-center w-full">
          <h2 className="text-t-primary text-lg truncate">{bread.name}</h2>
          <p>{category.name}</p>
        </div>
      </div>
    </>
  );
}

export default BreadCard;
