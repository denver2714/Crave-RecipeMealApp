"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MealCard } from "@/components/meal-card";
import { Meal } from "@/lib/api";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Meal[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="mb-8 text-4xl font-bold">Your Favorites</h1>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favorites.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <p className="text-xl">No favorites yet.</p>
            <p>Start exploring and save your favorite meals!</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
