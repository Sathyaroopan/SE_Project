"use client";
import { useState, useEffect } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const slots = [
  { id: 1, label: "09:00–10:00" },
  { id: 2, label: "10:00–11:00" },
  { id: 3, label: "11:15–12:15" },
  { id: 4, label: "13:00–14:00" },
  { id: 5, label: "14:00–15:00" },
];

export default function TimetableEditor() {
  // timetable[day][slotId] = subject
  const [timetable, setTimetable] = useState({});
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  // load user's courses from profile
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const res = await fetch("/api/auth/profile", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setAvailableCourses(data.courses || []);
        }
      } catch (err) {
        console.error("Failed to load courses", err);
      } finally {
        setLoadingCourses(false);
      }
    };

    loadCourses();
  }, []);

  useEffect(() => {
  const loadTimetable = async () => {
    try {
      const res = await fetch("/api/auth/timetable", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setTimetable(data || {}); 
      }
    } catch (err) {
      console.error("Failed to load timetable", err);
    }
  };

    loadTimetable();
  }, []);


  const handleChange = (day, slotId, value) => {
    setTimetable((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slotId]: value,
      },
    }));
  };

  const handleSave = async () => {
    await fetch("/api/auth/timetable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(timetable),
    });

    alert("Timetable saved");
  };

  if (loadingCourses) {
    return <div className="p-6">Loading subjects...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Weekly Timetable</h2>

      <table className="border-collapse border w-full text-center">
        <thead>
          <tr>
            <th className="border p-2">Day / Time</th>
            {slots.map((slot) => (
              <th key={slot.id} className="border p-2">
                {slot.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {days.map((day) => (
            <tr key={day}>
              <td className="border p-2 font-semibold">{day}</td>

              {slots.map((slot) => (
                <td key={slot.id} className="border p-2">
                  <select
                    value={timetable[day]?.[slot.id] || ""}
                    onChange={(e) => handleChange(day, slot.id, e.target.value)}
                    className="w-full border rounded px-2 py-1
                              bg-bg text-text
                              dark:bg-bg dark:text-primary-btn-text dark:border-gray-600"
                  >
                    <option value="">-- Select Subject --</option>
                    {availableCourses.map((course, i) => (
                      <option key={i} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
          ))}

          {/* Saturday & Sunday */}
          <tr>
            <td className="border p-2 font-semibold">Saturday</td>
            <td colSpan={slots.length} className="border p-2">
              Holiday
            </td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">Sunday</td>
            <td colSpan={slots.length} className="border p-2">
              Holiday
            </td>
          </tr>
        </tbody>
      </table>

      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 rounded cursor-pointer bg-primary-btn text-primary-btn-text hover:bg-primary-btn-hover transition-colors"
      >
        Save Timetable
      </button>
    </div>
  );
}
