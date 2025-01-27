import { ThemeToggle } from "./theme-toggle"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-2 flex justify-end">
        <ThemeToggle />
      </div>
    </nav>
  )
}

