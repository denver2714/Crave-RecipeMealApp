export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background py-8">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Crave. All rights reserved.</p>
        <p className="mt-2">Powered by TheMealDB API.</p>
      </div>
    </footer>
  );
}
