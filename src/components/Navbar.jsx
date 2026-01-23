"use client";

import { useEffect, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

export default function Navbar({ userName }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme");
    const isDark =
      storedTheme === "dark" ||
      (!storedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
    setDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const nextTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  if (!mounted) return null;

  return (
    <header className="h-14 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 bg-bg transition-colors">
      <h1 className="text-xl font-bold text-text">Academic Planner</h1>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 flex justify-center cursor-pointer rounded-full bg-secondary-btn text-secondary-btn-text hover:bg-secondary-btn-hover transition-all"
        >
          <span
            className={`inline-block transition-transform duration-500 ${
              darkMode ? "rotate-180" : "rotate-0"
            }`}
          >
            {darkMode ? (
              <MdLightMode size={20} className="text-yellow-400" />
            ) : (
              <MdDarkMode size={20} className="text-indigo-600" />
            )}
          </span>
        </button>

        {/* User Name */}
        <button className="px-4 py-2 bg-primary-btn text-primary-btn-text rounded hover:bg-primary-btn-hover transition-colors font-medium">
          {userName}
        </button>
      </div>
    </header>
  );
}
