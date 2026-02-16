import Link from "next/link";

const cards = [
  {
    href: "/admin/projects",
    title: "Projects",
    description: "Create, edit, and remove portfolio projects."
  },
  {
    href: "/admin/experiences",
    title: "Experiences",
    description: "Manage your career timeline, achievements, tags, and links."
  },
  {
    href: "/admin/blogs",
    title: "Blogs",
    description: "Manage development journal entries and categories."
  },
  {
    href: "/admin/categories",
    title: "Categories",
    description: "Define blog categories used across your posts."
  }
];

export default function AdminDashboardPage() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          className="rounded-2xl border-4 border-zinc-950 bg-white p-6 shadow-[0_4px_0_0_#09090b] transition-transform hover:-translate-y-0.5"
        >
          <h2 className="text-xl font-extrabold text-zinc-950">{card.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700">{card.description}</p>
        </Link>
      ))}
    </section>
  );
}
