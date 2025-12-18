# Crave - Recipe Discovery App

Welcome to **Crave**, a modern and responsive recipe discovery application built with Next.js 16 and Tailwind CSS. Crave helps you explore thousands of delicious recipes from around the world, from quick weeknight dinners to gourmet masterpieces.

![Project Banner](https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop)

## 🌟 Features

- **Recipe Discovery**: Browse a vast collection of recipes powered by [TheMealDB](https://www.themealdb.com/api.php).
- **Meal of the Moment**: Get inspired with a randomly featured meal every time you visit.
- **Search Functionality**: Easily find recipes by name or ingredient.
- **Categories**: Explore meals by categories such as Beef, Chicken, Vegetarian, Dessert, and more.
- **Detailed Recipe Views**: View comprehensive recipe details, including instructions, ingredients, and measurements.
- **Favorites System**: Save your favorite recipes locally to revisit them later (persisted via LocalStorage).
- **Responsive Design**: A fully responsive UI that looks great on mobile, tablet, and desktop.
- **Modern UI/UX**: Built with shadcn/ui components, featuring a clean code architecture and beautiful aesthetics.

## 🚀 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) (via [shadcn/ui](https://ui.shadcn.com/))
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Hooks (useState, useEffect)
- **API**: [TheMealDB API](https://www.themealdb.com/api.php)

## 📦 Installation & Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Steps

1.  **Clone the repository**

    ```bash
    git clone https://github.com/your-username/meal-app.git
    cd meal-app
    ```

2.  **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  **Open your browser**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 📂 Project Structure

```bash
meal-app/
├── app/                  # Next.js App Router pages and layouts
│   ├── favicon.ico
│   ├── globals.css       # Global styles and Tailwind directives
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   ├── explore/          # Explore page route
│   ├── favorites/        # Favorites page route
│   ├── meal/             # Meal details route (dynamic [id])
│   └── search/           # Search results route
├── components/           # Reusable UI components
│   ├── layout/           # Navbar, Footer
│   ├── ui/               # shadcn/ui primitives (Button, Input, etc.)
│   ├── category-card.tsx
│   ├── favorite-button.tsx
│   ├── meal-card.tsx
│   └── search-bar.tsx
├── lib/                  # Utility functions and API clients
│   └── api.ts            # TheMealDB API integration
└── public/               # Static assets
```

## 🔌 API Reference

This project uses the public **TheMealDB** API. No API key is required for standard usage.

- **Base URL**: `https://www.themealdb.com/api/json/v1/1/`

### Key Endpoints Used:

- `GET /random.php`: Fetches a single random meal.
- `GET /categories.php`: Lists all meal categories.
- `GET /lookup.php?i={id}`: Fetches details for a specific meal by ID.
- `GET /search.php?s={name}`: Searches for meals by name.
- `GET /filter.php?c={category}`: Filters meals by category.

## 🤝 Contributing

Contributions are welcome! If you'd like to improve this project, please:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
