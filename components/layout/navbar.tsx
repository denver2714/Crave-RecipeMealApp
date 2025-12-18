import Link from "next/link";
import { UtensilsCrossed, Heart, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-primary"
        >
          <UtensilsCrossed className="h-6 w-6" />
          <span>Crave</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/explore">
              <Compass className="mr-2 h-4 w-4" />
              Explore
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/favorites">
              <Heart className="mr-2 h-4 w-4" />
              Favorites
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
