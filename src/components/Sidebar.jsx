import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-800 shadow-sm bg-bg h-screen transition-colors">
      <div className="p-6 text-xl font-bold text-text">
        Icon
      </div>

      <nav className="flex flex-col gap-2 px-4">
        <Link
          href="/dashboard"
          className="px-4 py-2 rounded bg-primary-btn text-primary-btn-text hover:bg-primary-btn-hover transition-colors"
        >
          Dashboard
        </Link>

        <Link
          href="/planner"
          className="px-4 py-2 rounded bg-secondary-btn text-secondary-btn-text hover:bg-secondary-btn-hover transition-colors"
        >
          Planner
        </Link>

        <Link
          href="/profile"
          className="px-4 py-2 rounded bg-secondary-btn text-secondary-btn-text hover:bg-secondary-btn-hover transition-colors"
        >
          Profile
        </Link>
      </nav>
    </aside>
  );
}