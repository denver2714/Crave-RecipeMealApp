import Link from "next/link";
import { api } from "@/lib/api";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryCard } from "@/components/category-card";

export default async function ExplorePage() {
  const [categories, areas, ingredients] = await Promise.all([
    api.listCategories(),
    api.listAreas(),
    api.listIngredients(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="mb-8 text-4xl font-bold">Explore</h1>

        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="areas">Areas</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          </TabsList>

          <TabsContent value="categories">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {categories.map((category) => (
                <CategoryCard key={category.idCategory} category={category} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="areas">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {areas.map((area) => (
                <Link
                  key={area.strArea}
                  href={`/search?a=${area.strArea}`}
                  className="flex items-center justify-center rounded-xl border border-white/10 bg-card p-6 text-center font-semibold transition-all hover:border-primary/50 hover:text-primary hover:shadow-lg"
                >
                  {area.strArea}
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ingredients">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {ingredients.slice(0, 48).map((ingredient) => (
                <Link
                  key={ingredient.idIngredient}
                  href={`/search?i=${ingredient.strIngredient}`}
                  className="flex items-center justify-center rounded-xl border border-white/10 bg-card p-4 text-center text-sm font-medium transition-all hover:border-primary/50 hover:text-primary hover:shadow-lg"
                >
                  {ingredient.strIngredient}
                </Link>
              ))}
            </div>
            <p className="mt-8 text-center text-muted-foreground">
              Showing top 48 ingredients.
            </p>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
