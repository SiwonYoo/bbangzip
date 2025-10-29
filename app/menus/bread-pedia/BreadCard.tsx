import { BreadType, CategoryType } from "@/types";
import Image from "next/image";

function BreadCard({ bread, category }: { bread: BreadType; category: CategoryType }) {
  return (
    <>
      <div className="rounded-xl p-4 bg-white">
        <Image src={bread.images.official} width={200} height={200} alt={bread.name} />
        <div className="text-center">
          <h2 className="text-t-primary text-lg">{bread.name}</h2>
          <p>
            {category.name} | {bread.price.toLocaleString()}원
          </p>
        </div>
      </div>
    </>
  );
}

export default BreadCard;
