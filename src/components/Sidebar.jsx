"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const getLinkStyles = (href) => {
    const isActive = pathname === href;

    return isActive
      ? "bg-(--color-primary-btn) text-(--color-primary-btn-text) shadow-sm"
      : "bg-secondary-btn text-(--color-text)  hover:bg-(--color-secondary-btn-hover) opacity-70 hover:opacity-100";
  };

  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-bg h-screen transition-colors">
      <div className="p-6 text-xl font-bold text-text tracking-tight">
        Icon
      </div>

      <nav className="flex flex-col gap-2 px-4">
        <Link
          href="/dashboard"
          className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${getLinkStyles("/dashboard")}`}
        >
          Dashboard
        </Link>

        <Link
          href="/planner"
          className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${getLinkStyles("/planner")}`}
        >
          Planner
        </Link>

        <Link
          href="/profile"
          className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${getLinkStyles("/profile")}`}
        >
          Profile
        </Link>
      </nav>
    </aside>
  );
}