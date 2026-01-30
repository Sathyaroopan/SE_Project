"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [rollNumber, setrollNumber] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load existing profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch("/api/auth/profile", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setName(data.name || "");
          setrollNumber(data.rollNumber || "");
          setCourse(data.course || "");
          setSemester(data.semester || "");
          setCourses(data.courses || []);
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const saveProfile = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/auth/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name,
          rollNumber,
          course,
          semester,
          courses,
        }),
      });

      if (!res.ok) {
        alert("Failed to save profile");
      }
    } catch (err) {
      console.error("Save error", err);
    } finally {
      setSaving(false);
    }
  };

  const addCourse = () => {
    if (!newCourse.trim()) return;
    setCourses([...courses, newCourse.trim()]);
    setNewCourse("");
  };

  const removeCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const saveCourses = async () => {
  setSaving(true);
  try {
    const res = await fetch("/api/auth/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        courses, // only courses
      }),
    });

    if (!res.ok) {
      alert("Failed to save courses");
    }
  } catch (err) {
    console.error("Save courses error", err);
  } finally {
    setSaving(false);
  }
};

  if (loading) return <div className="p-6">Loading profile...</div>;

  return (
    <div className="p-6 space-y-10 max-w-3xl">
      {/* Basic Info */}
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Profile</h1>

        <div className="grid grid-cols-2 gap-4">
          <input
            className="border rounded p-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border rounded p-2"
            placeholder="Roll Number"
            value={rollNumber}
            onChange={(e) => setrollNumber(e.target.value)}
          />
          <input
            className="border rounded p-2"
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
          <input
            className="border rounded p-2"
            placeholder="Semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          />
        </div>

        <button
          onClick={saveProfile}
          disabled={saving}
          className="px-4 py-2 rounded cursor-pointer bg-primary-btn text-primary-btn-text hover:bg-primary-btn-hover transition-colors"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </div>

      {/* Courses Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Courses</h2>

        <div className="flex gap-2">
          <input
            className="flex-1 border rounded p-2"
            placeholder="Add new course"
            value={newCourse}
            onChange={(e) => setNewCourse(e.target.value)}
          />
          <button
            onClick={addCourse}
            className="px-4 py-2 rounded cursor-pointer bg-primary-btn text-primary-btn-text hover:bg-primary-btn-hover transition-colors"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {courses.map((c, i) => (
            <li
              key={i}
              className="flex justify-between items-center border rounded p-2"
            >
              <span>{c}</span>
              <button
                onClick={() => removeCourse(i)}
                className="text-red-600 hover:text-red-800 cursor-pointer"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        {/* Separate Save Courses button */}
        <button
          onClick={saveCourses}
          disabled={saving}
          className="px-4 py-2 rounded cursor-pointer bg-primary-btn text-primary-btn-text hover:bg-primary-btn-hover transition-colors"
        >
          {saving ? "Saving..." : "Save Courses"}
        </button>
      </div>

    </div>
  );
}
