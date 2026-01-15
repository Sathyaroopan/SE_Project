import { cookies } from "next/headers";

export default function Navbar() {
  const userName = "Student";

  return (
    <header className="h-14 border-b flex items-center justify-between px-6">
      <h1 className="p-6 text-xl font-bold">
        Academic Planner
      </h1>

      <button className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-900">
        {userName}
      </button>
    </header>
  );
}
