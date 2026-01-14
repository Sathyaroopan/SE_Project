"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    rollNumber: "",
    name: "",
    course: "",
    semester: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow w-full max-w-sm space-y-4"
      >
        <h1 className="text-xl font-semibold text-center">Register</h1>

        <input name="rollNumber" placeholder="Roll Number" onChange={handleChange} className="input" />
        <input name="name" placeholder="Name" onChange={handleChange} className="input" />
        <input name="course" placeholder="Course" onChange={handleChange} className="input" />
        <input name="semester" placeholder="Semester" onChange={handleChange} className="input" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input" />

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
