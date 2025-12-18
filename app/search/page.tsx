import { api } from "@/lib/api";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MealCard } from "@/components/meal-card";
import { SearchBar } from "@/components/search-bar";

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const letter = typeof params.f === "string" ? params.f : "";
  const category = typeof params.c === "string" ? params.c : "";
  const area = typeof params.a === "string" ? params.a : "";
  const ingredient = typeof params.i === "string" ? params.i : "";

  let meals: any[] | null = [];
  let title = "";

  if (query) {
    meals = await api.getMealByName(query);
    title = `Search Results for "${query}"`;
  } else if (letter) {
    meals = await api.listMealsByFirstLetter(letter);
    title = `Meals starting with "${letter}"`;
  } else if (category) {
    meals = await api.filterByCategory(category);
    title = `${category} Meals`;
  } else if (area) {
    meals = await api.filterByArea(area);
    title = `${area} Cuisine`;
  } else if (ingredient) {
    meals = await api.filterByIngredient(ingredient);
    title = `Meals with ${ingredient}`;
  } else {
    title = "Search for a meal";
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-12 flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold">{title}</h1>
          <div className="w-full max-w-md">
            <SearchBar />
          </div>
        </div>

        {meals && meals.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {meals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <p className="text-xl">No meals found.</p>
            <p>Try searching for something else like "Chicken" or "Pasta".</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
