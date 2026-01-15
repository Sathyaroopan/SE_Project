"use client";

import { useEffect, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

export default function Navbar() {
  const userName = "Student";
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);

    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) return null;

  return (
    <header className="h-14 border-b flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">
        Academic Planner
      </h1>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full flex justify-center
                     bg-gray-100 dark:bg-gray-800
                     text-gray-800 dark:text-gray-200
                     transition-all duration-300
                     hover:scale-110 active:scale-95"
          aria-label="Toggle Theme"
        >
          <span
            className={`inline-block transition-transform duration-300 ${
              darkMode ? "rotate-180" : "rotate-0"
            }`}
          >
            {darkMode ? (
              <MdLightMode size={20} />
            ) : (
              <MdDarkMode size={20} />
            )}
          </span>
        </button>

        {/* User Button */}
        <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition">
          {userName}
        </button>
      </div>
    </header>
  );
}
