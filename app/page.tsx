import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SearchBar } from "@/components/search-bar";
import { MealCard } from "@/components/meal-card";
import { CategoryCard } from "@/components/category-card";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const [randomMeal, categories] = await Promise.all([
    api.getRandomMeal(),
    api.listCategories(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden py-20">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background z-10" />
            <div
              className="h-full w-full bg-cover bg-center opacity-20"
              style={{
                backgroundImage:
                  "url('https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg')",
              }}
            />
          </div>

          <div className="container relative z-20 mx-auto px-4 text-center">
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-7xl">
              <span className="block text-primary">Crave</span>
              <span className="block text-3xl sm:text-5xl mt-2 text-foreground">
                What are you hungry for?
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Discover thousands of delicious recipes from around the world.
              From quick weeknight dinners to gourmet masterpieces.
            </p>
            <div className="mx-auto max-w-md">
              <SearchBar />
            </div>
          </div>
        </section>

        {/* Meal of the Moment */}
        {randomMeal && (
          <section className="container mx-auto px-4 py-16">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">
                Meal of the Moment
              </h2>
              <Button variant="link" asChild>
                <Link href={`/meal/${randomMeal.idMeal}`}>
                  View Recipe <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:gap-16 items-center">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border shadow-2xl">
                <img
                  src={randomMeal.strMealThumb}
                  alt={randomMeal.strMeal}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-4xl font-bold text-primary">
                  {randomMeal.strMeal}
                </h3>
                <div className="flex gap-4">
                  <span className="rounded-full bg-secondary px-4 py-1.5 text-sm font-medium">
                    {randomMeal.strCategory}
                  </span>
                  <span className="rounded-full bg-secondary px-4 py-1.5 text-sm font-medium">
                    {randomMeal.strArea}
                  </span>
                </div>
                <p className="text-lg text-muted-foreground line-clamp-4">
                  {randomMeal.strInstructions}
                </p>
                <Button size="lg" asChild>
                  <Link href={`/meal/${randomMeal.idMeal}`}>Cook This Now</Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Categories */}
        <section className="container mx-auto px-4 py-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">
              Explore Categories
            </h2>
            <Button variant="link" asChild>
              <Link href="/explore">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {categories.slice(0, 12).map((category) => (
              <CategoryCard key={category.idCategory} category={category} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
