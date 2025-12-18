"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Meal } from "@/lib/api";

interface FavoriteButtonProps {
  meal: Pick<
    Meal,
    "idMeal" | "strMeal" | "strMealThumb" | "strCategory" | "strArea"
  >;
}

export function FavoriteButton({ meal }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.some((f: Meal) => f.idMeal === meal.idMeal));
  }, [meal.idMeal]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter((f: Meal) => f.idMeal !== meal.idMeal);
    } else {
      newFavorites = [...favorites, meal];
    }

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <Button
      variant={isFavorite ? "default" : "outline"}
      size="icon"
      onClick={toggleFavorite}
      className="rounded-full"
    >
      <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
    </Button>
  );
}
