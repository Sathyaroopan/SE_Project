import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { signToken } from "@/lib/jwt";

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const user = await User.create({
    ...body,
    password: hashedPassword,
  });

  const token = signToken({ id: user._id });

  const response = NextResponse.json({ message: "Registered" });
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
  });

  return response;
}
