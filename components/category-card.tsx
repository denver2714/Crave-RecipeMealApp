import Image from "next/image";
import Link from "next/link";
import { Category } from "@/lib/api";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/explore?category=${category.strCategory}`}
      className="group block overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="relative aspect-square w-full overflow-hidden p-4">
        <div className="absolute inset-0 bg-secondary/30 transition-colors group-hover:bg-secondary/50" />
        <Image
          src={category.strCategoryThumb}
          alt={category.strCategory}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 20vw"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary">
          {category.strCategory}
        </h3>
      </div>
    </Link>
  );
}
