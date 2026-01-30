import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { connectDB } from "@/lib/db";
import Timetable from "@/models/Timetable";

// POST: Save or update timetable
export async function POST(req) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const decoded = verifyToken(token);
    const userId = decoded.id;

    const newTimetable = await req.json(); // { Monday: {1: "Math"} ... }

    // upsert timetable for the user
    await Timetable.findOneAndUpdate(
      { userId },
      { timetable: newTimetable },
      { upsert: true, new: true }
    );

    return NextResponse.json({ message: "Timetable saved" });
  } catch (err) {
    console.error("Error saving timetable:", err);
    return NextResponse.json({ error: "Failed to save timetable" }, { status: 500 });
  }
}

// GET: Get timetable for the logged-in user
export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const decoded = verifyToken(token);
    const userId = decoded.id;

    const timetableDoc = await Timetable.findOne({ userId });
    return NextResponse.json(timetableDoc?.timetable || {});
  } catch (err) {
    console.error("Error fetching timetable:", err);
    return NextResponse.json({ error: "Failed to fetch timetable" }, { status: 500 });
  }
}
