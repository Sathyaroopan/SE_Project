import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r shadow-sm">
      <div className="p-6 text-xl font-bold">
        Icon
      </div>

      <nav className="flex flex-col gap-2 px-4">
        <Link
          href="/dashboard"
          className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-900"
        >
          Dashboard
        </Link>

        <Link
          href="/planner"
          className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-900"
        >
          Planner
        </Link>

        <Link
          href="/profile"
          className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-900"
        >
          Profile
        </Link>
      </nav>
    </aside>
  );
}
