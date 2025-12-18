import Image from "next/image";
import Link from "next/link";
import { Meal } from "@/lib/api";

interface MealCardProps {
  meal: Pick<
    Meal,
    "idMeal" | "strMeal" | "strMealThumb" | "strCategory" | "strArea"
  >;
}

export function MealCard({ meal }: MealCardProps) {
  return (
    <Link
      href={`/meal/${meal.idMeal}`}
      className="group block overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />
      </div>
      <div className="p-4">
        <h3 className="line-clamp-1 text-lg font-semibold text-card-foreground group-hover:text-primary">
          {meal.strMeal}
        </h3>
        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          {meal.strCategory && (
            <span className="rounded-full bg-secondary px-2 py-1">
              {meal.strCategory}
            </span>
          )}
          {meal.strArea && (
            <span className="rounded-full bg-secondary px-2 py-1">
              {meal.strArea}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
