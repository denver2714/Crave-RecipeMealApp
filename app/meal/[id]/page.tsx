import Link from "next/link";
import { ArrowLeft, Youtube, ExternalLink } from "lucide-react";
import { api, Meal } from "@/lib/api";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { FavoriteButton } from "@/components/favorite-button";

interface MealPageProps {
  params: Promise<{ id: string }>;
}

export default async function MealPage({ params }: MealPageProps) {
  const { id } = await params;
  const meal = await api.getMealById(id);

  if (!meal) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Meal not found</h1>
        <Button asChild className="mt-4">
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    );
  }

  // Extract ingredients and measures
  const ingredients: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof Meal];
    const measure = meal[`strMeasure${i}` as keyof Meal];

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient as string,
        measure: (measure as string) || "",
      });
    }
  }

  // Extract YouTube ID
  const getYoutubeId = (url: string | null) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const youtubeId = getYoutubeId(meal.strYoutube);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-[400px] w-full overflow-hidden md:h-[500px]">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-background to-transparent p-8 pt-32">
            <div className="container mx-auto">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="mb-4 text-white hover:text-primary"
              >
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              <h1 className="text-4xl font-bold text-white md:text-6xl">
                {meal.strMeal}
              </h1>
              <div className="mt-4 flex flex-wrap gap-3 items-center">
                <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                  {meal.strCategory}
                </span>
                <span className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                  {meal.strArea}
                </span>
                {meal.strTags &&
                  meal.strTags.split(",").map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                <div className="ml-auto">
                  <FavoriteButton meal={meal} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto grid gap-12 px-4 py-12 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_400px]">
          <div className="space-y-12">
            {/* Instructions */}
            <section>
              <h2 className="mb-6 text-2xl font-bold">Instructions</h2>
              <div className="prose prose-invert max-w-none text-muted-foreground">
                {meal.strInstructions.split("\r\n").map(
                  (paragraph, idx) =>
                    paragraph.trim() && (
                      <p key={idx} className="mb-4">
                        {paragraph}
                      </p>
                    )
                )}
              </div>
            </section>

            {/* Video */}
            {youtubeId && (
              <section>
                <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
                  <Youtube className="h-6 w-6 text-red-500" />
                  Video Tutorial
                </h2>
                <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="border-0"
                  />
                </div>
              </section>
            )}
          </div>

          <div className="space-y-8">
            {/* Ingredients */}
            <div className="rounded-xl border border-white/10 bg-card p-6 shadow-lg">
              <h2 className="mb-6 text-xl font-bold">Ingredients</h2>
              <ul className="space-y-3">
                {ingredients.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start justify-between border-b border-white/5 pb-2 last:border-0"
                  >
                    <span className="font-medium">{item.ingredient}</span>
                    <span className="text-muted-foreground text-right ml-4">
                      {item.measure}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div className="rounded-xl border border-white/10 bg-card p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-bold">Links</h2>
              <div className="space-y-3">
                {meal.strSource && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <a
                      href={meal.strSource}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Source
                    </a>
                  </Button>
                )}
                {meal.strYoutube && (
                  <Button
                    variant="outline"
                    className="w-full justify-start hover:text-red-500"
                    asChild
                  >
                    <a
                      href={meal.strYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Youtube className="mr-2 h-4 w-4" />
                      Watch on YouTube
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
